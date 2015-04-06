create table if not exists `yi_admin` (
    `id` int(11) unsigned not null auto_increment,
    `username` varchar(60) not null default '',
    `password` varchar(64) not null default '',
    `status` tinyint(1) not null default '1' comment '0:禁用, 1:激活',
    `type` tinyint(1) not null default '0' comment '0:超级管理员, 1:运营, 2:财务',
    `regTime` timestamp not null default current_timestamp,
    `loginTime` timestamp not null default current_timestamp,
    `lastIP` varchar(32) not null default '',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

--insert into `yi_admin` (`id`, `username`, `password`) values (1, 'admin', '5c224162363cd3fa624b37da0028b90f');
