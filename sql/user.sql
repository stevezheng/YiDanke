create table if not exists `yi_user` (
    `id` int(11) unsigned not null auto_increment,
    `username` varchar(60) not null default '',
    `password` varchar(64) not null default '',
    `tradePassword` varchar(64) not null default '',
    `status` tinyint(1) default '1' comment '用户状态：0：禁用，1：游客, 2: 会员',
    `type` tinyint(1) default '0' comment '用户类型：0：买手，1：商家',
    `regTime` timestamp not null default current_timestamp,
    `loginTime` timestamp not null default 0,
    `lastIP` varchar(32) not null default '',
    `coin` decimal(10, 2) not null default '0',
    `money` decimal(10, 2) not null default '0.00',
    `sellerMoney` decimal(10, 2) not null default '0.00' comment '商家返款冻结押金',
    `platformMoney` decimal(10, 2) not null default '0.00' comment '平台返款冻结押金',
    `realName` varchar(12) not null default '',
    `province` varchar(12) not null default '',
    `city` varchar(12) not null default '',
    `area` varchar(12) not null default '',
    `address` varchar(64) not null default '',
    `phone` varchar(11) not null default '',
    `vipExprie` timestamp not null default 0,
    `qq` varchar(16) not null default '',
    `email` varchar(64) not null default '',
    `pv` int(11) not null default 0,
    `exp` int(8) not null default '0' comment '经验',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;