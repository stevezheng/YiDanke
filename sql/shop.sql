create table if not exists `yi_shop` (
    `id` int(11) unsigned not null auto_increment,
    `shopName` varchar(32) not null default '' comment '店铺主账号名',
    `shopStatus` tinyint(1) not null default '0' comment '店铺状态 0：待审核， 1：通过审核， -1：拒绝审核',
    `shopUrl` varchar(512) not null default '' comment '店铺网址',
    `shopProvince` varchar(512) not null default '' comment '省份',
    `shopCity` varchar(512) not null default '' comment '城市',
    `shopArea` varchar(512) not null default '' comment '地区',
    `shopAddress` varchar(512) not null default '' comment '店铺地址',
    `shopUserId` int(11) not null comment '用户id',
    `shopPlatform` varchar(11) not null comment '平台id',
    `shopExpressNumber` varchar(64) not null comment '快递网点号',
    `shopExpressPhone` varchar(64) not null comment '发货电话',
    `shopComment` varchar(512) not null default '' comment '备注信息',
    `shopCreateTime` timestamp not null default current_timestamp,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;