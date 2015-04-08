create table if not exists `yi_account` (
    `id` int(11) unsigned not null auto_increment,
    `accountName` varchar(32) not null default '' comment '买号名称',
    `accountRealName` varchar(32) not null default '' comment '收货人姓名',
    `accountPhone` varchar(11) not null comment '手机号',
    `accountStatus` tinyint(1) not null default '0' comment '买号状态 0：待审核， 1：通过审核， -1：拒绝审核',
    `accountProvince` varchar(512) not null default '' comment '省份',
    `accountCity` varchar(512) not null default '' comment '城市',
    `accountArea` varchar(512) not null default '' comment '地区',
    `accountAddress` varchar(512) not null default '' comment '地址',
    `accountUserId` int(11) not null comment '用户id',
    `accountPlatform` varchar(11) not null comment '平台id',
    `accountComment` varchar(512) not null default '' comment '备注信息',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;