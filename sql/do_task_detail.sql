create table if not exists `yi_do_task_detail` (
    `id` int(11) unsigned not null auto_increment,
    `doTaskDetailDoTaskId` int(11) not null comment '任务单id',
    `doTaskDetailComment` varchar(512) not null default '' comment '备注信息',
    `doTaskDetailCreateTime` timestamp not null default current_timestamp,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;