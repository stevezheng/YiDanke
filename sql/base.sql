create table if not exists `yi_admin` (
    `id` int(11) unsigned not null auto_increment,
    `username` varchar(60) not null default '',
    `password` varchar(64) not null default '',
    `status` tinyint(1) not null default '1', --0:禁用, 1:激活--
    `type` tinyint(1) not null default '0', --0:超级管理员, 1:运营, 2:财务--
    `regTime` timestamp not null default current_timestamp,
    `loginTime` timestamp not null default current_timestamp,
    `lastIP` varchar(32) not null default '',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

--insert into `yi_admin` (`id`, `username`, `password`, `regTime`) values (1, 'admin', '5c224162363cd3fa624b37da0028b90f', '2014-11-8 02:33');

create table if not exists `yi_buyer` (
    `id` int(11) unsigned not null auto_increment,
    `username` varchar(60) not null default '',
    `password` varchar(64) not null default '',
    `tradePassword` varchar(64) not null default '',
    `status` tinyint(1) default '1',
    `type` tinyint(1) default '0',
    `regTime` timestamp not null default current_timestamp,
    `loginTime` timestamp not null default current_timestamp,
    `lastIP` varchar(32) not null default '',
    `coin` decimal(10, 2) not null default '0',
    `totalCoin` int(11) not null default '0',
    `money` decimal(10, 2) not null default '0.00',
    `sellerMoney` decimal(10, 2) not null default '0.00',
    `platformMoney` decimal(10, 2) not null default '0.00',
    `realName` varchar(12) not null default '',
    `city` varchar(64) not null default '',
    `address` varchar(64) not null default '',
    `phone` varchar(11) not null default '',
    `vipExprie` timestamp not null default current_timestamp,
    `qq` varchar(16) not null default '',
    `email` varchar(64) not null default '',
    `buyerDoTaskStatus` tinyint(1) not null default '0',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

insert into `yi_buyer`` (`username`, `password`) values ('stevezheng', '5c224162363cd3fa624b37da0028b90f')

create table if not exists `yi_seller` (
    `id` int(11) unsigned not null auto_increment,
    `username` varchar(60) not null default '',
    `password` varchar(64) not null default '',
    `tradePassword` varchar(64) not null default '',
    `status` tinyint(1) default '1',
    `type` tinyint(1) default '0',
    `regTime` timestamp not null default current_timestamp,
    `loginTime` timestamp not null default current_timestamp,
    `lastIP` varchar(32) not null default '',
    `coin` decimal(10, 2) not null default '0',
    `money` decimal(10, 2) not null default '0.00',
    `sellerFrozeMoney` decimal(10, 2) not null default '0.00',
    `platformFrozeMoney` decimal(10, 2) not null default '0.00',
    `realName` varchar(12) not null default '',
    `city` varchar(64) not null default '',
    `address` varchar(64) not null default '',
    `phone` varchar(11) not null default '',
    `vipExprie` timestamp not null default current_timestamp,
    `qq` varchar(16) not null default '',
    `email` varchar(64) not null default '',
    `vp` int(64) unsigned not null default '0',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table if not exists `yi_bank` (
    `id` int(11) unsigned not null auto_increment,
    `userType` tinyint(1) not null default '0',
    `status` tinyint(1) not null default '0',
    `userId` int(1) not null,
    `type` tinyint(1) not null default '0',
    `realName` varchar(16) not null default '',
    `account` varchar(32) not null default '',
    `image` varchar(512) not null default '',
    `bankName` varchar(32) not null default '',
    `bankCity` varchar(16) not null default '',
    `bankDetail` varchar(32) not null default '',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table if not exists `yi_shop` (
    `id` int(11) unsigned not null auto_increment,
    `shopName` varchar(32) not null default '',
    `status` tinyint(1) not null default '0',
    `url` varchar(512) not null default '',
    `address` varchar(512) not null default '',
    `userId` int(11) not null,
    `platformId` int(11) not null,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table if not exists `yi_task` (
    `id` int(11) unsigned not null auto_increment,
    `shopId` int(11) not null default '0',
    `taskTypeId` int(11) not null default '0',
    `platformId` int(11) not null default '0',
    `itemName` varchar(256) not null default '',
    `itemUrl` varchar(1024) not null default '',
    `itemTip` varchar(128) not null default '',
    `onePrice` decimal(10, 2) not null default '0',
    `amount` int(11) not null default '0',
    `searchPrice` decimal(10, 2) not null default '0',
    `itemName1` varchar(256) not null default '',
    `itemUrl1` varchar(1024) not null default '',
    `itemTip1` varchar(128) not null default '',
    `onePrice1` decimal(10, 2) not null default '0',
    `amount1` int(11) not null default '0',
    `searchPrice1` decimal(10, 2) not null default '0',
    `itemPic1` varchar(512) not null default '',
    `itemName2` varchar(256) not null default '',
    `itemUrl2` varchar(1024) not null default '',
    `itemTip2` varchar(128) not null default '',
    `onePrice2` decimal(10, 2) not null default '0',
    `amount2` int(11) not null default '0',
    `searchPrice2` decimal(10, 2) not null default '0',
    `itemPic2` varchar(512) not null default '',
    `taobaoKey` varchar(32) not null default '',
    `taobaoCat` varchar(128) not null default '',
    `taobaoKey1` varchar(32) not null default '',
    `taobaoCat1` varchar(128) not null default '',
    `taobaoKey2` varchar(32) not null default '',
    `taobaoCat2` varchar(128) not null default '',
    `taobaoKey3` varchar(32) not null default '',
    `taobaoCat3` varchar(128) not null default '',
    `taobaoPic` varchar(512) not null default '',
    `tmallKey` varchar(32) not null default '',
    `tmallCat` varchar(128) not null default '',
    `tmallKey1` varchar(32) not null default '',
    `tmallCat1` varchar(128) not null default '',
    `tmallKey2` varchar(32) not null default '',
    `tmallCat2` varchar(128) not null default '',
    `tmallKey3` varchar(32) not null default '',
    `tmallCat3` varchar(128) not null default '',
    `tmallPic` varchar(512) not null default '',
    `searchPriceFrom` decimal(10, 0) not null default '0',
    `searchPriceTo` decimal(10, 0) not null default '0',
    `pos` varchar(32) not null default '',
    `transport` tinyint(1) not null default '0',
    `totalPrice` decimal(10, 0) not null default '0',
    `totalPrice1` decimal(10, 0) not null default '0',
    `totalPrice2` decimal(10, 0) not null default '0',
    `totalCount` int(11) not null default '0',
    `freeCount` int(11) not null default '0',
    `computerCount` int(11) not null default '0',
    `phoneCount` int(11) not null default '0',
    `ctaobaoKey` varchar(64) not null default '',
    `ctaobaoKey1` varchar(64) not null default '',
    `ctaobaoKey2` varchar(64) not null default '',
    `ctaobaoKey3` varchar(64) not null default '',
    `ctmallKey` varchar(64) not null default '',
    `ctmallKey1` varchar(64) not null default '',
    `ctmallKey2` varchar(64) not null default '',
    `ctmallKey3` varchar(64) not null default '',
    `pv` int(11) not null default '0',
    `isUpTaskFee` tinyint(1) not null default '0',
    `isPriorityTask` tinyint(1) not null default '0',
    `isIntervalTask` varchar(8) not null default '',
    `platformPayBack` varchar(8) not null default '',
    `upTaskSpeed` decimal(10, 2) not null default '0',
    `upTaskFee` decimal(10, 2) not null default '0',
    `intervalTaskTime` int(8) not null default '0',
    `intervalTaskCount` int(8) not null default '0',
    `periodTask` varchar(8) not null default '',
    `ckeywordTask` varchar(32) not null default '',
    `ckeywordTask1` varchar(32) not null default '',
    `ckeywordTask2` varchar(32) not null default '',
    `ckeywordTask3` varchar(32) not null default '',
    `ckeywordTask4` varchar(32) not null default '',
    `ckeywordTask5` varchar(32) not null default '',
    `ckeywordTask6` varchar(32) not null default '',
    `ckeywordTask7` varchar(32) not null default '',
    `ckeywordTask8` varchar(32) not null default '',
    `ckeywordTask9` varchar(32) not null default '',
    `doingComputerCount` int(11) not null default '0',
    `doingPhoneCount` int(11) not null default '0',
    `doneComputerCount` int(11) not null default '0',
    `donePhoneCount` int(11) not null default '0',
    `doingCount` int(11) not null default '0',
    `doneCount` int(11) not null default '0',
    `oneTaskFee` decimal(10, 0) not null default '0',
    `createTime` timestamp not null default current_timestamp,
    `status` tinyint(1) not null default '0',
    `userId` int(11) not null default '0',
    `taskMoney` decimal(10, 2) not null default '0',
    `taskCoin` decimal(10, 2) not null default '0',
    `taskExtendCoin` decimal(10, 2) not null default '0',
    `shopName` varchar(64) not null default '',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--create table if not exists `yi_task` (
--    `id` int(11) unsigned not null auto_increment,
--    `platformId` int(11) not null,
--    `status` tinyint(1) not null default '0',
--    `shopId` int(11) not null,
--    `taskTypeId` int(11) not null,
--    `userId` int(11) not null,
--    `transport` tinyint(1) not null default '1',
--    `totalCount` int(11) not null default '0',
--    `computerCount` int(11) not null default '0',
--    `phoneCount` int(11) not null default '0',
--    `doningComputerCount` int(11) not null default '0',
--    `doningPhoneCount` int(11) not null default '0',
--    `doneComputerCount` int(11) not null default '0',
--    `donePhoneCount` int(11) not null default '0',
--    `doingCount` int(11) not null default '0',
--    `doneCount` int(11) not null default '0',
--    `oneTaskFee` decimal(10, 0) not null default '0',
--    PRIMARY KEY (`id`)
--) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table if not exists `yi_task_type` (
    `id` int(11) unsigned not null auto_increment,
    `taskTypeName` varchar(32) not null default '',
    `status` tinyint(1) not null default '1',
    `platformId` int(11) not null,
    `basePrice` decimal(10, 2) not null default '0',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--create table if not exists `yi_task_extra` (
--    `id` int(11) unsigned not null auto_increment,
--    `taskId` int(11) not null,
--    `platformPayBack` tinyint(1) not null default '0',
--    `upTaskSpeed` int(4) not null default '0',
--    `upTaskFee` int(6) not null default '0',
--    `intervalTaskTime` int(4) not null default '0',
--    `intervalTaskCount` int(4) not null default '0',
--    `periodTask` tinyint(2) not null default '0',
--    `keywordTasK1` varchar(256) not null default '',
--    `keywordTask2` varchar(256) not null default '',
--    `keywordTask3` varchar(256) not null default '',
--    `keywordTask4` varchar(256) not null default '',
--    `keywordTask5` varchar(256) not null default '',
--    `keywordTask6` varchar(256) not null default '',
--    `keywordTask7` varchar(256) not null default '',
--    `keywordTask8` varchar(256) not null default '',
--    `keywordTask9` varchar(256) not null default '',
--    `keywordTask10` varchar(256) not null default '',
--    `extraFee` decimal(10,2) not null default '0'
--    PRIMARY KEY (`id`)
--) ENGINE=InnoDB DEFAULT CHARSET=utf8;
--
--create table if not exists `yi_task_item` (
--    `id` int(11) unsigned not null auto_increment,
--    `taskId` int(11) not null,
--    `taskItemName` varchar(128) not null default '',
--    `itemUrl` varchar(1024) not null default '',
--    `tip1` varchar(32) not null default '',
--    `tip2` varchar(32) not null default '',
--    `fee` decimal(10, 2) not null default '0',
--    `onePrice` decimal(10, 2) not null,
--    `amount` int(11) not null,
--    `searchPrice` decimal(11) null,
--    `taobaoKey1` varchar(64) not null default '',
--    `taobaoKey2` varchar(64) not null default '',
--    `taobaoKey3` varchar(64) not null default '',
--    `taobaoKey4` varchar(64) not null default '',
--    `taobaoCat1_1` varchar(64) not null default '',
--    `taobaoCat1_2` varchar(64) not null default '',
--    `taobaoCat1_3` varchar(64) not null default '',
--    `taobaoCat1_4` varchar(64) not null default '',
--    `taobaoCat2_1` varchar(64) not null default '',
--    `taobaoCat2_2` varchar(64) not null default '',
--    `taobaoCat2_3` varchar(64) not null default '',
--    `taobaoCat2_4` varchar(64) not null default '',
--    `taobaoCat3_1` varchar(64) not null default '',
--    `taobaoCat3_2` varchar(64) not null default '',
--    `taobaoCat3_3` varchar(64) not null default '',
--    `taobaoCat3_4` varchar(64) not null default '',
--    `taobaoCat4_1` varchar(64) not null default '',
--    `taobaoCat4_2` varchar(64) not null default '',
--    `taobaoCat4_3` varchar(64) not null default '',
--    `taobaoCat4_4` varchar(64) not null default '',
--    `tmallKey1` varchar(64) not null default '',
--    `tmallKey2` varchar(64) not null default '',
--    `tmallKey3` varchar(64) not null default '',
--    `tmallKey4` varchar(64) not null default '',
--    `tmallCat1_1` varchar(64) not null default '',
--    `tmallCat1_2` varchar(64) not null default '',
--    `tmallCat1_3` varchar(64) not null default '',
--    `tmallCat1_4` varchar(64) not null default '',
--    `tmallCat2_1` varchar(64) not null default '',
--    `tmallCat2_2` varchar(64) not null default '',
--    `tmallCat2_3` varchar(64) not null default '',
--    `tmallCat2_4` varchar(64) not null default '',
--    `tmallCat3_1` varchar(64) not null default '',
--    `tmallCat3_2` varchar(64) not null default '',
--    `tmallCat3_3` varchar(64) not null default '',
--    `tmallCat3_4` varchar(64) not null default '',
--    `tmallCat4_1` varchar(64) not null default '',
--    `tmallCat4_2` varchar(64) not null default '',
--    `tmallCat4_3` varchar(64) not null default '',
--    `tmallCat4_4` varchar(64) not null default '',
--    `searchPriceFrom` decimal(10,2) not null default '',
--    `searchPriceTo` decimal(10,2) not null default '',
--    `itemPosition` varchar(256) not null default '',
--    `itemImg` varchar(512) not null default '',
--    PRIMARY KEY (`id`)
--) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table if not exists `yi_account` (
    `id` int(11) unsigned not null auto_increment,
    `accountName` varchar(32) not null default '',
    `status` tinyint(1) not null default '0',
    `accountAddress` varchar(512) not null default '',
    `accountRealName` varchar(16) not null default '',
    `accountPhone` varchar(11) not null default '',
    `userId` int(11) not null,
    `platformId` int(11) not null,
    `workStatus` tinyint(1) not null default '0',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table if not exists `yi_do_task` (
    `id` int(11) unsigned not null auto_increment,
    `platformId` int(11) not null,
    `buyerId` int(11) not null,
    `accountId` int(11) not null,
    `accountName` varchar(32) not null '',
    `taskId` int(11) not null,
    `createTime` timestamp not null,
    `doTaskStatus` tinyint(1) not null default '0',
    `expressId` varchar(64) not null default '',
    `expressName` varchar(64) not null default '',
    `terminal` tinyint(1) not null default '0',
    `comment` varchar(1024) not null default '',
    `backOrderId` varchar(128) not null default '',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table if not exists `yi_do_task_detail` (
    `id` int(11) unsigned not null auto_increment,
    `doTaskId` int(11) not null,
    `itemsSearchUrl` text not null default '',
    `itemUrl` varchar(1024) not null default '',
    `orderId` varchar(128) not null default '',
    `payMoney` decimal(10, 2) not null default '0',
    `talkPic` varchar(128) not null default '',
    `payPic` varchar(128) not null default '',
    `doTime` timestamp not null default current_timestamp,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table if not exists `yi_seller_money_log` (
    `id` int(11) unsigned not null auto_increment,
    `sellerId` int(11) not null,
    `type` tinyint(1) not null,
    `money` decimal(10, 2) not null default '0',
    `createTime` timestamp not null,
    `comment` varchar(512) not null default '',
    `balance` decimal(10, 2) not null default '0',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table if not exists `yi_seller_out_money_log` (
    `id` int(11) unsigned not null auto_increment,
    `sellerId` int(11) not null,
    `status` tinyint(1) not null default '0',
    `money` decimal(10, 2) not null default '0',
    `createTime` timestamp not null,
    `comment` varchar(512) not null default '',
    `orderId` varchar(128) not null default '',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table if not exists `yi_seller_coin_log` (
    `id` int(11) unsigned not null auto_increment,
    `sellerId` int(11) not null,
    `type` tinyint(1) not null,
    `coin` decimal(10, 2) not null default '0',
    `createTime` timestamp not null,
    `comment` varchar(512) not null default '',
    `balance` decimal(10, 2) not null default '0',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table if not exists `yi_seller_log` (
    `id` int(11) unsigned not null auto_increment,
    `sellerId` int(11) not null,
    `type` tinyint(1) not null,
    `coin` decimal(10, 2) not null default '0',
    `createTime` timestamp not null,
    `comment` varchar(512) not null default '',
    `money` decimal(10, 2) not null default '0',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table if not exists `yi_buyer_out_money_log` (
    `id` int(11) unsigned not null auto_increment,
    `buyerId` int(11) not null,
    `orderId` varchar(128) not null default '',
    `money` decimal(10, 2) not null default '0',
    `createTime` timestamp not null,
    `status` tinyint(1) not null default '0',
    `comment` varchar(512) not null default '',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table if not exists `yi_buyer_coin_log` (
    `id` int(11) unsigned not null auto_increment,
    `buyerId` int(11) not null,
    `type` tinyint(1) not null,
    `coin` decimal(10, 2) not null default '0',
    `createTime` timestamp not null,
    `comment` varchar(512) not null default '',
    `balance` decimal(10, 2) not null default '0',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table if not exists `yi_buyer_fee_log` (
    `id` int(11) unsigned not null auto_increment,
    `buyerId` int(11) not null,
    `accountId` int(1) not null,
    `accountName` varchar(128) not null default '',
    `createTime` timestamp not null,
    `comment` varchar(512) not null default '',
    `platformId` int(11) not null default '0',
    `coin` decimal(10, 2) not null default '0',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table if not exists `yi_buyer_log` (
    `id` int(11) unsigned not null auto_increment,
    `buyerId` int(11) not null,
    `type` tinyint(1) not null,
    `coin` decimal(10, 2) not null default '0',
    `createTime` timestamp not null,
    `comment` varchar(512) not null default '',
    `money` decimal(10, 2) not null default '0',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table if not exists `yi_buyer_purchase_check` (
    `id` int(11) unsigned not null auto_increment,
    `money` decimal(10, 0) not null default '0',
    `status` tinyint(1) not null default '0',
    `buyerId` int(11) not null,
    `createTime` timestamp not null default current_timestamp,
    `bankType` tinyint(2) not null default '0',
    `purchaseType` tinyint(2) not null default '0',
    `orderId` varchar(64) not null default '',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table if not exists `yi_seller_purchase_check` (
    `id` int(11) unsigned not null auto_increment,
    `money` decimal(10, 0) not null default '0',
    `status` tinyint(1) not null default '0',
    `sellerId` int(11) not null,
    `createTime` timestamp not null default current_timestamp,
    `bankType` tinyint(2) not null default '0',
    `purchaseType` tinyint(2) not null default '0',
    `orderId` varchar(64) not null default '',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table if not exists `yi_pv` (
    `id` int(11) unsigned not null auto_increment,
    `sellerId` int(11) not null default '0',
    `sellerName` varchar(128) not null default '',
    `pv` int(11) not null default '0',
    `createTime` timestamp not null default current_timestamp,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
