create table if not exists `yi_bank` (
    `id` int(11) unsigned not null auto_increment,
    `type` tinyint(1) not null default '0' comment '银行类型 0：财付通， 1：支付宝， 2：银行卡',
    `status` tinyint(1) not null default '0' comment '银行状态 0：待审核， 1：通过审核， -1： 拒绝审核',
    `userId` int(1) not null,
    `realName` varchar(16) not null default '' comment '姓名/开户人姓名',
    `account` varchar(32) not null default '' comment '账号/卡号',
    `image` varchar(512) not null default '' comment '账号信息截图',
    `bankName` varchar(32) not null default '' comment '银行名称',
    `bankArea` varchar(16) not null default '' comment '开户支行',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
