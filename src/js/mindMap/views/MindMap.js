import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import G6 from '@antv/g6';
import autobind from 'autobind-decorator';


const data = {
  // "id": "root",
  "name": "flare",
  "children": [{
    "name": "analytics",
    "children": [{
      "name": "cluster",
      "children": [{
        "name": "AgglomerativeCluster",
      }, {
        "name": "CommunityStructure",
      }, {
        "name": "HierarchicalCluster",
      }, {
        "name": "MergeEdge",
      }]
    }, {
      "name": "tree",
      "children": [{
        "name": "BetweennessCentrality",
      }, {
        "name": "LinkDistance",
      }, {
        "name": "MaxFlowMinCut",
      }, {
        "name": "ShortestPaths",
      }, {
        "name": "SpanningTree",
      }]
    }, {
      "name": "optimization",
      "children": [{
        "name": "AspectRatioBanker"
      }]
    }]
  }, {
    "name": "animate",
    "children": [{
      "name": "Easing",
    }, {
      "name": "FunctionSequence",
    }, {
      "name": "interpolate",
      "children": [{
        "name": "ArrayInterpolator",
      }, {
        "name": "ColorInterpolator",
      }, {
        "name": "DateInterpolator",
      }, {
        "name": "Interpolator",
      }, {
        "name": "MatrixInterpolator",
      }, {
        "name": "NumberInterpolator",
      }, {
        "name": "ObjectInterpolator",
      }, {
        "name": "PointInterpolator",
      }, {
        "name": "RectangleInterpolator",
      }]
    }, {
      "name": "ISchedulable",
    }, {
      "name": "Parallel",
    }, {
      "name": "Pause",
    }, {
      "name": "Scheduler",
    }, {
      "name": "Sequence",
    }, {
      "name": "Transition",
    }, {
      "name": "Transitioner",
    }, {
      "name": "TransitionEvent",
    }, {
      "name": "Tween",
    }]
  }]
};
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

class MindMap extends PureComponent {
  constructor(props) {
    super(props);

    this.dragParentNode = null;
    this.currentMoveNode = null;
    this.tree = null;
  }

  componentDidMount() {
    this.renderMap();
  }

  @autobind
  checkMove() {
    if (this.dragParentNode && this.currentMoveNode) {
      this.tree.remove(this.currentMoveNode.id);
      this.tree.add(this.dragParentNode.id, this.currentMoveNode);
      this.dragParentNode = null;
      this.currentMoveNode = null;
    }
  }

  @autobind
  renderMap() {

    const tree = this.tree = new G6.Tree({
      id: 'mindId',
      height: 900,
      width: 1200,
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
        if (hasClass(child, 'label')) {
          return true;
        }
        return false;
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
              label: input.value
            });
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
    tree.addBehaviour('default', ['clickActive']);  // support clickFocus
    tree.edge().shape('smooth');
    tree.node().label('name').style(nodeStyle);
    tree.node().tooltip(['name', 'id']);
    tree.tooltip(true);
    tree.source(data);

    tree.render();

    tree.on('dragstart', ev => {
      if (ev.itemType !== 'node') {
        return;
      }
      this.currentMoveNode = ev.item && ev.item.getModel();
      const keyShape = ev.item.getKeyShape();
      keyShape.attr(moveDashStyle);
      tree.refresh();
    });
    tree.on('dragend', () => {
      this.checkMove();
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
      let newNode;
      let id;

      if (!active || active.get('type') !== 'node') {
        return;
      }

      id = active.get('id');
      if (!id) {
        return;
      }

      if (ev.keyCode === 46 || ev.keyCode === 8) {
        tree.remove(id);
      }

      if (ev.keyCode === 9) {

        newNode = tree.add(id, {
          name: '新增节点'
        });
        setTimeout(() => {
          showInputLabel(newNode);
        }, 460);
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
    return <div id='mindId' style={{flex: 1}} />;
  }
}


export default MindMap;