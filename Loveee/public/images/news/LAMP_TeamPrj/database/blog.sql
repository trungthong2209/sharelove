create database `blog`;
use `blog`;
create table users(
    `u_id` int(11) unsigned not null primary key AUTO_INCREMENT,
    `username` varchar(100) not null,
    `password` varchar(100) not null,
    `fullname` varchar(200) not null,
    `role` tinyint not null,
    `status` tinyint not null
)engine=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

create table category(
    `c_id` int(11) unsigned not null primary key AUTO_INCREMENT,
    `category_name` varchar(100) not null
)engine=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

create table post(
    `p_id` int(11) unsigned not null primary key AUTO_INCREMENT,
    `title` varchar(100) not null,
    `subtitle` varchar(1000) not null,
    `content` varchar(10000) not null,
    `time` datetime not null,
    `author_id` int(11) unsigned not null,
    `category_id` int(11) unsigned not null,
    `image` varchar(100),
    `status` tinyint not null,
    foreign key (`author_id`) references users(`u_id`),
    foreign key (`category_id`) references category(`c_id`) 
)engine=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;