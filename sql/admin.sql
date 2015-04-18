create table if not exists `yi_admin` (
    `id` int(11) unsigned not null auto_increment,
    `username` varchar(60) not null default '',
    `password` varchar(64) not null default '',
    `status` tinyint(1) not null default '1' comment '0:禁用, 1:激活',
    `type` varchar(1) not null default '1' comment '0:超级管理员, 1:运营, 2:财务',
    `regTime` timestamp not null default current_timestamp,
    `loginTime` timestamp not null default 0,
    `lastIP` varchar(32) not null default '',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

insert into `yi_admin` (`id`, `username`, `password`) values (1, 'admin', 'e10adc3949ba59abbe56e057f20f883e');
