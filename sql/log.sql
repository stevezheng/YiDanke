create table if not exists `yi_log_user` (
    `id` int(11) unsigned not null auto_increment,
    `logUserType` tinyint(1) not null default '0' comment '操作类型 -1：删除, 0：登陆, 1：注册, 2：更新',
    `logUserId` int(11) not null comment '用户id',
    `logUserComment` varchar(512) not null default '' comment '日志内容',
    `logUserIP` varchar(32) not null default '' comment '操作用户IP',
    `logUserCreateTime` timestamp not null default current_timestamp,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table if not exists `yi_log_money` (
    `id` int(11) unsigned not null auto_increment,
    `logUserType` tinyint(1) not null default '0' comment '操作类型 -1：删除, 0：登陆, 1：注册, 2：更新',
    `logUserId` int(11) not null comment '用户id',
    `logUserComment` varchar(512) not null default '' comment '日志内容',
    `logUserCreateTime` timestamp not null default current_timestamp,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table if not exists `yi_log_bank` (
    `id` int(11) unsigned not null auto_increment,
    `logUserType` tinyint(1) not null default '0' comment '操作类型 -1：删除, 0：登陆, 1：注册, 2：更新',
    `logUserId` int(11) not null comment '用户id',
    `logUserComment` varchar(512) not null default '' comment '日志内容',
    `logUserCreateTime` timestamp not null default current_timestamp,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table if not exists `yi_log_admin` (
    `id` int(11) unsigned not null auto_increment,
    `logUserType` tinyint(1) not null default '0' comment '操作类型 -1：删除, 0：登陆, 1：注册, 2：更新',
    `logUserId` int(11) not null comment '用户id',
    `logUserComment` varchar(512) not null default '' comment '日志内容',
    `logUserCreateTime` timestamp not null default current_timestamp,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table if not exists `yi_log_account` (
    `id` int(11) unsigned not null auto_increment,
    `logUserType` tinyint(1) not null default '0' comment '操作类型 -1：删除, 0：登陆, 1：注册, 2：更新',
    `logUserId` int(11) not null comment '用户id',
    `logUserComment` varchar(512) not null default '' comment '日志内容',
    `logUserCreateTime` timestamp not null default current_timestamp,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table if not exists `yi_log_shop` (
    `id` int(11) unsigned not null auto_increment,
    `shopName` varchar(32) not null default '' comment '店铺名称',
    `shopStatus` tinyint(1) not null default '0' comment '店铺状态 0：待审核， 1：通过审核， -1：拒绝审核',
    `shopUrl` varchar(512) not null default '' comment '店铺网址',
    `shopAddress` varchar(512) not null default '' comment '店铺地址',
    `shopUserId` int(11) not null comment '用户id',
    `shopPlatform` varchar(11) not null comment '平台id',
    `shopCreateTime` timestamp not null default current_timestamp,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
