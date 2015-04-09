create table if not exists `yi_money` (
    `id` int(11) unsigned not null auto_increment,
    `moneyType` tinyint(1) not null default '0' comment '资金类型 0：金币， 1：押金， 2：流量',
    `moneyUse` tinyint(1) not null default '0' comment '资金用途: 0：充值， 1：提现',
    `moneyStatus` tinyint(1) not null default '0' comment '资金状态 0：待审核， 1：通过审核， -1： 拒绝审核',
    `moneyUserId` int(11) not null,
    `moneyValue` decimal(10, 2) not null default 0,
    `moneyOrder` varchar(64) not null default '' comment '资金流水号',
    `moneyCreateTime` timestamp not null default current_timestamp,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
