import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import G6 from '@antv/g6';
import autobind from 'autobind-decorator';
import uuid from 'uuid';

const Util = G6.Util;

const input = Util.createDOM('<input class="g6-label-input" />', {
  position: 'absolute',
  zIndex: 10,
  display: 'none'
});

function hasClass(shape, className) {
  if (shape) {
    const clasees = shape.get('class');
    if (clasees && clasees.indexOf(className) !== -1) {
      return true;
    }
  }
  return false;
}

class Mind extends PureComponent {
  constructor(props) {
    super(props);

    this.dragParentNode = null;
    this.currentMoveNode = null;
    this.tree = null;
  }

  componentDidMount() {
    if (this.props.isNew) {
      this.renderMap();
    } else if (this.props.data) {
      this.renderMap(this.props.data);
    }
  }

  componentWillReceiveProps(nextProps) {
    const {data} = nextProps;
    if ((data && !this.props.data) || (data && this.props.data && data.source.updateTime !== this.props.data.source.updateTime)) {
      const newData = {
        guides: [],
        ...data
      };
      if (this.tree) {
        this.tree.read(newData);
        this.tree.refresh();
      } else if (!this.props.isNew) {
        this.renderMap(newData);
      }
    }
  }

  @autobind
  checkMove() {
    if (this.dragParentNode && this.currentMoveNode && this.drag) {
      this.tree.remove(this.currentMoveNode.id);
      this.tree.add(this.dragParentNode.id, this.currentMoveNode);
      this.dragParentNode = null;
      this.currentMoveNode = null;
    }
  }

  @autobind
  update() {
    const {source, ...others} = this.tree.save();
    this.props.onChange({
      source: {
        updateTime: new Date().getTime(),
        ...source
      },
      ...others
    });
  }

  @autobind
  renderMap(data) {
    const update = this.update;
    const tree = this.tree = new G6.Tree({
      id: 'mindId',
      fitView: {                      // 自动对齐到中心点
        x: 0,
        y: 0
      },
      grid: {
        forceAlign: true, // 是否支持网格对齐
        cell: 10,         // 网格大小
      },
      layoutCfg: {
        direction: 'H',
        getHGap: () => {
          return 40;
        },
        getVGap: () => {
          return 10;
        }
      },
    });
    const graphContainer = tree.get('graphContainer');
    const mouseEnterNodeStyle = {
      lineWidth: 2,
      fill: 'lightblue'
    };
    const nodeStyle = {
      lineWidth: 1,
      fill: 'white'
    };
    const moveDashStyle = {
      lineDash: [3, 3],
      fill: 'white'
    };

    function showInputLabel(node) {
      if (!node) {
        return;
      }
      const group = node.get('group');
      const label = group.findBy(function (child) {
        return hasClass(child, 'label');
      });
      const rootGroup = tree.get('rootGroup');
      const bbox = Util.getBBox(label, rootGroup);
      const borderWidth = 1;
      const text = label.attr('text');
      clearAllActived();

      input.value = text;
      input.show();
      input.css({
        top: bbox.minY - borderWidth + 'px',
        left: bbox.minX - borderWidth + 'px',
        width: bbox.width + 'px',
        height: bbox.height + 'px',
        padding: '0px',
        margin: '0px',
        border: borderWidth + 'px solid #999'
      });
      input.focus();
      input.node = node;
    }


    function updateLabel() {
      if (input.visibility) {
        const node = input.node;
        clearAllActived();
        if (input.value !== node.get('model').name) {
          if (input.value) {
            tree.update(node, {
              name: input.value
            });
            tree.refresh();
            setTimeout(() => {
              update();
            }, 100)
          }
        }
        input.hide();
      }
    }

    function clearAllActived() {
      tree.clearAllActived();
      tree.refresh(false);
    }

    input.hide = function () {
      input.css({
        display: 'none'
      });
      input.visibility = false;
    };
    input.show = function () {
      input.css({
        display: 'block'
      });
      input.visibility = true;
    };

    graphContainer.appendChild(input);
    tree.addBehaviour('default', ['clickBlankClearActive']);
    tree.addBehaviour('default', ['clickFocus']);  // support clickFocus
    tree.addBehaviour('default', ['clickActive']);
    tree.edge().shape('smooth');
    tree.node().label('name').style(nodeStyle);
    tree.node().tooltip(['name']);
    tree.tooltip(true);

    if (data) {
      tree.read(data);
    } else {
      tree.source({name: 'new mind map'});
    }

    tree.render();
    update();

    tree.on('dragstart', ev => {
      if (ev.itemType !== 'node') {
        return;
      }
      const model = ev.item && ev.item.getModel();
      if (model && model.root) {
        return;
      }
      this.currentMoveNode = model;
      const keyShape = ev.item.getKeyShape();
      keyShape.attr(moveDashStyle);
      tree.refresh();
      this.drag = true;
    });
    tree.on('dragend', () => {
      this.checkMove();
      this.drag = false;
    });

    tree.on('itemmouseenter', ev => {
      if (ev.itemType !== 'node') {
        return;
      }
      this.dragParentNode = ev.item.getModel();

      const keyShape = ev.item.getKeyShape();
      keyShape.attr(mouseEnterNodeStyle);
      tree.refresh();
    });

    tree.on('itemmouseleave', ev => {
      if (ev.itemType !== 'node') {
        return;
      }
      this.dragParentNode = null;
      const keyShape = ev.item.getKeyShape();
      keyShape.attr(nodeStyle);
      tree.refresh();
    });

    tree.on('click', () => {
      updateLabel();
      input.hide();
    });

    tree.on('dblclick', ev => {
      const item = ev.item;
      const shape = ev.shape;

      if (hasClass(shape, 'label') && item && item.get('type') === 'node') {
        showInputLabel(item);
      }
    });

    tree.on('dragmove', () => {
      input.hide();
    });

    tree.on('keydown', (ev) => {
      const active = tree.getActived();
      let id;
      let newNode;

      if (!active || active.get('type') !== 'node') {
        return;
      }

      id = active.get('id');
      if (!id) {
        return;
      }

      if (ev.keyCode === 46 || ev.keyCode === 8) {
        tree.remove(id);
        update();
      }

      if (ev.keyCode === 9) {
        newNode = tree.add(id, {
          name: '新增节点',
          id: uuid.v4()
        });
        update();
        setTimeout(() => {
          input.node = newNode;
          clearAllActived();
        }, 0);
        // setTimeout(() => {
        //   showInputLabel(newNode);
        // }, 460);
      }
    });

    input.on('keydown', ev => {
      if (ev.keyCode === 13) {
        updateLabel();
      }
    });

    input.on('blur', () => {
      updateLabel();
    });
  }

  render() {
    const {style} = this.props;
    return (
      <div id='mindId' style={style} />
    );
  }
}


Mind.propTypes = {
  data: PropTypes.shape({}),
  onChange: PropTypes.func,
};

Mind.defaultProps = {
  data: null,
  onChange: () => {
  }
};

export default Mind;
