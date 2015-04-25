create table if not exists `yi_log_user` (
    `id` int(11) unsigned not null auto_increment,
    `logUserType` tinyint(1) not null default '0' comment '操作类型 -1：删除, 0：登陆, 1：注册, 2：更新, 3:退出',
    `logUserId` int(11) not null comment '用户id',
    `logUserComment` varchar(512) not null default '' comment '日志内容',
    `logUserIP` varchar(32) not null default '' comment '操作用户IP',
    `logUserCreateTime` timestamp not null default current_timestamp,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table if not exists `yi_log_coin` (
    `id` int(11) unsigned not null auto_increment,
    `logCoinType` tinyint(1) not null comment '收支类型 -1：支出, 1：收入',
    `logCoin` decimal(10, 2) not null comment '收支',
    `logCoinBalance` decimal(10, 2) not null comment '结余',
    `logCoinUserId` int(11) not null comment '用户id',
    `logCoinUserType` tinyint(1) not null comment '收支类型 0：买手, 1：商家',
    `logCoinComment` varchar(512) not null default '' comment '日志内容',
    `logCoinUserName` varchar(64) not null comment '用户名称',
    `logCoinIP` varchar(32) not null default '' comment '操作用户IP',
    `logCoinCreateTime` timestamp not null default current_timestamp,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table if not exists `yi_log_money` (
    `id` int(11) unsigned not null auto_increment,
    `logMoneyType` tinyint(1) not null comment '收支类型 -1：支出, 1：收入',
    `logMoney` decimal(10, 2) not null comment '收支',
    `logMoneyBalance` decimal(10, 2) not null comment '结余',
    `logMoneyUserId` int(11) not null comment '用户id',
    `logMoneyUserName` varchar(64) not null comment '用户名称',
    `logMoneyUserType` tinyint(1) not null comment '收支类型 0：买手, 1：商家',
    `logMoneyComment` varchar(512) not null default '' comment '日志内容',
    `logMoneyIP` varchar(32) not null default '' comment '操作用户IP',
    `logMoneyCreateTime` timestamp not null default current_timestamp,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table if not exists `yi_log_withdraw` (
    `id` int(11) unsigned not null auto_increment,
    `logWithdrawType` tinyint(1) not null default '0' comment '收支类型 0：提现',
    `logWithdrawStatus` tinyint(1) not null default '0' comment '状态：0：待审核， 1: 提现成功，-1:拒绝提现',
    `logWithdraw` decimal(10, 2) not null comment '收支',
    `logWithdrawBalance` decimal(10, 2) not null comment '结余',
    `logWithdrawUserId` int(11) not null comment '用户id',
    `logWithdrawUserName` varchar(64) not null comment '用户名称',
    `logWithdrawUserType` tinyint(1) not null comment '收支类型 0：买手, 1：商家',
    `logWithdrawComment` varchar(512) not null default '' comment '日志内容',
    `logWithdrawIP` varchar(32) not null default '' comment '操作用户IP',
    `logWithdrawCreateTime` timestamp not null default current_timestamp,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table if not exists `yi_log_pv` (
    `id` int(11) unsigned not null auto_increment,
    `logPVType` tinyint(1) not null comment '收支类型 -1：支出, 1：收入',
    `logPV` decimal(10, 2) not null comment '收支',
    `logPVBalance` decimal(10, 2) not null comment '结余',
    `logPVUserId` int(11) not null comment '用户id',
    `logPVUserName` varchar(64) not null comment '用户名称',
    `logPVUserType` tinyint(1) not null comment '收支类型 0：买手, 1：商家',
    `logPVComment` varchar(512) not null default '' comment '日志内容',
    `logPVIP` varchar(32) not null default '' comment '操作用户IP',
    `logPVCreateTime` timestamp not null default current_timestamp,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table if not exists `yi_log_member` (
    `id` int(11) unsigned not null auto_increment,
    `logMemberType` tinyint(1) not null default '0' comment '收支类型 0：开通',
    `logMember` decimal(10, 2) not null comment '收支',
    `logMemberUserId` int(11) not null comment '用户id',
    `logMemberUserName` varchar(64) not null comment '用户名称',
    `logMemberUserType` tinyint(1) not null comment '收支类型 0：买手, 1：商家',
    `logMemberComment` varchar(512) not null default '' comment '日志内容',
    `logMemberIP` varchar(32) not null default '' comment '操作用户IP',
    `logMemberCreateTime` timestamp not null default current_timestamp,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table if not exists `yi_crazyclick_log` (
    `id` int(11) unsigned not null auto_increment,
    `userId` int(11) not null,
    `username` varchar(64) not null,
    `taskId` int(11) not null,
    `kwd` varchar(32) not null default '',
    `nid` varchar(32) not null default '',
    `appkey` varchar(16) not null default '',
    `platform` varchar(16) not null default '',
    `shop_type` varchar(8) not null default '',
    `times` varchar(11) not null default '',
    `sleep_time` varchar(6) not null default '',
    `click_start_input` varchar(3) not null default '',
    `click_end_input` varchar(3) not null default '',
    `status` varchar(10) not null,
    `begin_time` varchar(11) not null default '',
    `end_time` varchar(11) not null default '',
    `create_at` varchar(11) not null default '',
    `updated_at` varchar(11) not null default '',
    `click_start` varchar(11) not null default '',
    `click_end` varchar(11) not null default '',
    `click_interval` int(8) not null,
    `rid` int(11) unsigned not null,
    PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
