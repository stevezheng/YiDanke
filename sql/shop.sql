create table if not exists `yi_shop` (
    `id` int(11) unsigned not null auto_increment,
    `shopName` varchar(32) not null default '' comment '店铺名称',
    `status` tinyint(1) not null default '0' comment '店铺状态 0：待审核， 1：通过审核， -1：拒绝审核',
    `url` varchar(512) not null default '' comment '店铺网址',
    `address` varchar(512) not null default '' comment '店铺地址',
    `userId` int(11) not null comment '用户id',
    `platformId` int(11) not null comment '平台id',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;