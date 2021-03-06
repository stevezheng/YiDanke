create table if not exists `yi_task_tmall` (
    `id` int(11) unsigned not null auto_increment,
    `tmallTaskId` int(11) not null comment '所属任务id',
    `tmallImage` varchar(512) not null default '' comment '天猫商品图片',
    `tmallKeywordsCount` int(1) not null default '1' comment '关键词数量',
    `tmallKey1` varchar(32) not null default '' comment '天猫关键词1',
    `tmallKeyCount1` int(5) not null default '0' comment '天猫关键词1刷单数',
    `tmallKey1Extend1` varchar(32) not null default '' comment '天猫关键词1分类1',
    `tmallKey1Extend2` varchar(32) not null default '' comment '天猫关键词1分类1',
    `tmallKey1Extend3` varchar(32) not null default '' comment '天猫关键词1分类1',
    `tmallKey1Extend4` varchar(32) not null default '' comment '天猫关键词1分类1',

    `tmallKey2` varchar(32) not null default '' comment '天猫关键词2',
    `tmallKeyCount2` int(5) not null default '0' comment '天猫关键词2刷单数',
    `tmallKey2Extend1` varchar(32) not null default '' comment '天猫关键词2分类1',
    `tmallKey2Extend2` varchar(32) not null default '' comment '天猫关键词2分类1',
    `tmallKey2Extend3` varchar(32) not null default '' comment '天猫关键词2分类1',
    `tmallKey2Extend4` varchar(32) not null default '' comment '天猫关键词2分类1',

    `tmallKey3` varchar(32) not null default '' comment '天猫关键词3',
    `tmallKeyCount3` int(5) not null default '0' comment '天猫关键词3刷单数',
    `tmallKey3Extend1` varchar(32) not null default '' comment '天猫关键词3分类1',
    `tmallKey3Extend2` varchar(32) not null default '' comment '天猫关键词3分类1',
    `tmallKey3Extend3` varchar(32) not null default '' comment '天猫关键词3分类1',
    `tmallKey3Extend4` varchar(32) not null default '' comment '天猫关键词3分类1',

    `tmallKey4` varchar(32) not null default '' comment '天猫关键词4',
    `tmallKeyCount4` int(5) not null default '0' comment '天猫关键词4刷单数',
    `tmallKey4Extend1` varchar(32) not null default '' comment '天猫关键词4分类1',
    `tmallKey4Extend2` varchar(32) not null default '' comment '天猫关键词4分类1',
    `tmallKey4Extend3` varchar(32) not null default '' comment '天猫关键词4分类1',
    `tmallKey4Extend4` varchar(32) not null default '' comment '天猫关键词4分类1',

    `tmallKey5` varchar(32) not null default '' comment '天猫关键词5',
    `tmallKeyCount5` int(5) not null default '0' comment '天猫关键词5刷单数',
    `tmallKey5Extend1` varchar(32) not null default '' comment '天猫关键词5分类1',
    `tmallKey5Extend2` varchar(32) not null default '' comment '天猫关键词5分类1',
    `tmallKey5Extend3` varchar(32) not null default '' comment '天猫关键词5分类1',
    `tmallKey5Extend4` varchar(32) not null default '' comment '天猫关键词5分类1',
    `tmallCreateTime` timestamp not null default current_timestamp,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;