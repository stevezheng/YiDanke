create table if not exists `yi_withdraw` (
    `id` int(11) unsigned not null auto_increment,
    `withdrawUserId` int(11) not null comment '用户id',
    `withdrawBankId` int(11) not null comment '提现账号id',
    `withdrawStatus` tinyint(1) not null default '0' comment '提现状态 0：待审核， 1：通过审核， -1：拒绝审核',
    `withdrawType` tinyint(1) not null default '0' comment '提现类型0：金币， 1：押金, 2:垫付本金',
    `withdrawValue` decimal(10, 2) not null default '0' comment '提现金额',
    `withdrawDoTaskIds` varchar(2048) not null default '' comment '提现ids',
    `withdrawComment` varchar(512) not null default '' comment '备注信息',
    `withdrawCreateTime` timestamp not null default current_timestamp,
    PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;