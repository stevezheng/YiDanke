create table if not exists `yi_do_task_detail` (
    `id` int(11) unsigned not null auto_increment,
    `doTaskDetailDoTaskId` int(11) not null comment '任务单id',
    `doTaskDetailTaskId` int(11) not null comment '任务id',
    `doTaskDetailItemUrl` varchar(512) not null default '' comment '检查url',
    `doTaskDetailItemUrl1` varchar(512) not null default '' comment '检查url1',
    `doTaskDetailItemUrl2` varchar(512) not null default '' comment '检查url2',
    `doTaskDetailItemUrl3` varchar(512) not null default '' comment '检查url3',
    `doTaskDetailItemUrl4` varchar(512) not null default '' comment '检查url4',
    `doTaskDetailTalkImage` varchar(512) not null default '' comment '聊天截图',
    `doTaskDetailOrderImage` varchar(512) not null default '' comment '订单截图',
    `doTaskDetailOrderId` varchar(512) not null default '' comment '订单id',
    `doTaskDetailOrderMoney` decimal(10, 2) not null default '0' comment '实付金额',
    `doTaskDetailComment` varchar(512) not null default '' comment '备注信息',
    `doTaskDetailCreateTime` timestamp not null default current_timestamp,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;