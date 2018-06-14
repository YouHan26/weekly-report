/**
 *
 */
package com.yiqi.social.common.constant;

import java.util.HashMap;
import java.util.Map;

/**
 * Copyright (c) 2017 BaiZe.com
 
 . All rights reserved.
 *
 * @author zhanghailiang
 * @location Shenzhen.China
 * @date 2017年2月6日
 *
 */
public class BannerConstant {
  
  /**
   * Banner状态-可用
   */
  public static final Integer BANNER_STATE_VALID = 1;
  /**
   * Banner状态-不可用
   */
  public static final Integer BANNER_STATE_INVALID = 0;
  
  /**
   * Banner列表类型 - 微行程页面
   */
  public static final int BANNER_LIST_TYPE_MICRO_TRIP = 1;
  
  /**
   * Banner列表类型 - 生活圈
   */
  public static final int BANNER_LIST_TYPE_TIMELINE = 2;
  
  /**
   * Banner列表类型 - 消息页面
   */
  public static final int BANNER_LIST_TYPE_MESSAGE = 3;
  
  /**
   * Banner列表类型 - 个人页面
   */
  public static final int BANNER_LIST_TYPE_USER_PAGE = 4;
  
  /**
   * Banner列表类型 - 商户页面
   */
  public static final int BANNER_LIST_TYPE_MERCHANT_PAGE = 5;
  
  public static final Map<Integer, String> BANNER_LIST_TYPE_MAP = new HashMap<Integer, String>();
  
  static {
  BANNER_LIST_TYPE_MAP.put(BANNER_LIST_TYPE_MICRO_TRIP, "微行程页面");
  BANNER_LIST_TYPE_MAP.put(BANNER_LIST_TYPE_TIMELINE, "生活圈");
  BANNER_LIST_TYPE_MAP.put(BANNER_LIST_TYPE_MESSAGE, "消息页面");
  BANNER_LIST_TYPE_MAP.put(BANNER_LIST_TYPE_USER_PAGE, "个人页面");
  BANNER_LIST_TYPE_MAP.put(BANNER_LIST_TYPE_MERCHANT_PAGE, "商户页面");
}

/**
 * Banner类型
 */

public static final Integer BANNER_TYPE_CUSTOMER = 0;

public static final Integer BANNER_TYPE_ARTICLE = 1;

public static final Integer BANNER_TYPE_WALLET = 2;

public static final Integer BANNER_TYPE_SCAN = 3;

public static final Integer BANNER_TYPE_COUPONS = 4;

public static final Integer BANNER_TYPE_TAG = 5;

public static final Integer BANNER_TYPE_MERCHANT_USER = 6;


public static final Map<Integer, String> BANNER_TYPE_MAP = new HashMap<Integer, String>();

static {
  BANNER_TYPE_MAP.put(BANNER_TYPE_CUSTOMER, "自定义URL");
  BANNER_TYPE_MAP.put(BANNER_TYPE_ARTICLE, "站内文章");
  BANNER_TYPE_MAP.put(BANNER_TYPE_WALLET, "卡包");
  BANNER_TYPE_MAP.put(BANNER_TYPE_SCAN, "扫一扫");
  BANNER_TYPE_MAP.put(BANNER_TYPE_COUPONS, "优惠券");
  BANNER_TYPE_MAP.put(BANNER_TYPE_TAG, "标签页");
  BANNER_TYPE_MAP.put(BANNER_TYPE_MERCHANT_USER, "商户主页");
}

/**
 * Banner 跳转 url
 */
public static final Map<Integer, String> BANNER_URL_MAP = new HashMap<Integer, String>();

private static final String BANNER_TYPE_CUSTOMER_URL_PREFIX = "";
public static final String BANNER_ARTICLE_URL = "histreet://article?articleKey=";
public static final String BANNER_WALLET_URL = "histreet://page/wallet";
public static final String BANNER_TYPE_SCAN_URL = "histreet://page/scan";
public static final String BANNER_TYPE_COUPONS_URL = "histreet://coupons?couponsKey=";
public static final String BANNER_TYPE_TAG_URL = "histreet://tag?tagKey=";
public static final String BANNER_TYPE_MERCHANT_USER_URL = "histreet://user?userKey=";



static {
  BANNER_URL_MAP.put(BANNER_TYPE_CUSTOMER, BANNER_TYPE_CUSTOMER_URL_PREFIX);
  BANNER_URL_MAP.put(BANNER_TYPE_ARTICLE, BANNER_ARTICLE_URL);
  BANNER_URL_MAP.put(BANNER_TYPE_WALLET, BANNER_WALLET_URL);
  BANNER_URL_MAP.put(BANNER_TYPE_SCAN, BANNER_TYPE_SCAN_URL);
  BANNER_URL_MAP.put(BANNER_TYPE_COUPONS, BANNER_TYPE_COUPONS_URL);
  BANNER_URL_MAP.put(BANNER_TYPE_TAG, BANNER_TYPE_TAG_URL);
  BANNER_URL_MAP.put(BANNER_TYPE_MERCHANT_USER, BANNER_TYPE_MERCHANT_USER_URL);
}
  
}