create table if not exists `yi_task_zhitongche` (
    `id` int(11) unsigned not null auto_increment,
    `zhitongcheTaskId` int(11) not null comment '所属任务id',
    `zhitongcheName` varchar(256) not null default '' comment '商品名',
    `zhitongcheMoney` decimal(10, 2) not null default '0' comment '商品价格',
    `zhitongcheImage1` varchar(512) not null default '' comment '商品图片1',
    `zhitongcheImage2` varchar(512) not null default '' comment '商品图片2',
    `zhitongcheCreateTime` timestamp not null default current_timestamp,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;