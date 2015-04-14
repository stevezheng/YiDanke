create table if not exists `yi_task_extend` (
    `id` int(11) unsigned not null auto_increment,
    `extendTaskId` int(11) not null comment '所属任务id',
    `extend1Name` varchar(256) not null default '' comment '商品名',
    `extend1Url` varchar(512) not null default '' comment '商品链接',
    `extend1Image` varchar(512) not null default '' comment '商品图片',
    `extend1Money` decimal(10, 2) not null default '0' comment '商品价格',
    `extend1Count` int(4) not null default '0' comment '商品购买数量',
    `extend1SearchMoney` decimal(10,2) not null default '0' comment '商品搜索价格',
    `extend1Tag1` varchar(12) not null default '' comment '规格1',
    `extend1Tag2` varchar(12) not null default '' comment '规格2',

    `extend2Name` varchar(256) not null default '' comment '商品名',
    `extend2Url` varchar(512) not null default '' comment '商品链接',
    `extend2Image` varchar(512) not null default '' comment '商品图片',
    `extend2Money` decimal(10, 2) not null default '0' comment '商品价格',
    `extend2Count` int(4) not null default '0' comment '商品购买数量',
    `extend2SearchMoney` decimal(10,2) not null default '0' comment '商品搜索价格',
    `extend2Tag1` varchar(12) not null default '' comment '规格1',
    `extend2Tag2` varchar(12) not null default '' comment '规格2',
    `extendCreateTime` timestamp not null default current_timestamp,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;