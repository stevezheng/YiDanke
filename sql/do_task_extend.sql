create table if not exists `yi_do_task_extend` (
    `id` int(11) unsigned not null auto_increment,
    `doTaskExtendDoTaskId` int(11) not null comment '任务单id',
    `doTaskExtendTaskId` int(11) not null comment '任务id',
    `doTaskExtendComment` varchar(512) not null default '' comment '备注信息',
    `doTaskExtendExpressCreateTime` timestamp not null default current_timestamp comment '快递号创建时间',
    `doTaskExtendExpressName` varchar(32) not null default '' comment '快递公司',
    `doTaskExtendExpressId` varchar(128) not null default '' comment '快递号',
    `doTaskExtendExpressTime` timestamp null comment '快递发出时间',
    `doTaskExtendGoodComment` varchar(512) not null default '' comment '宝贝好评',
    `doTaskExtendGoodImage` varchar(512) not null default '' comment '收货截图',
    `doTaskExtendPaybackTime` timestamp null comment '返款时间',
    `doTaskExtendPaybackImage` varchar(512) not null default '' comment '返款截图',
    `doTaskExtendConfirmTime` timestamp null comment '确认返款时间',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;