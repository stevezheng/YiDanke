create table if not exists `yi_money` (
    `id` int(11) unsigned not null auto_increment,
    `moneyType` tinyint(1) not null default '0' comment '充值类型 0：金币， 1：押金， 2：流量',
    `moneyPlatform` varchar(10) not null default '' comment '充值途经 alipay: 支付宝，kuaiqian:快钱, tenpay:财付通, bank:银行',
    `moneyStatus` tinyint(1) not null default '0' comment '充值状态 0：待审核， 1：通过审核， -1： 拒绝审核',
    `moneyUserId` int(11) not null,
    `moneyValue` decimal(10, 2) not null default 0,
    `moneyOrder` varchar(64) not null default '' comment '充值流水号(如果是银行类型，流水号前面加上:银行名)',
    `moneyComment` varchar(256) not null default '' comment '充值备注',
    `moneyCreateTime` timestamp not null default current_timestamp,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
