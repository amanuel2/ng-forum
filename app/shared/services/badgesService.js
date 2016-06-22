(function() {

    'use strict';

    angular
        .module('ForumApp')
        .service("badgesService", badgesServiceFunc)

    function badgesServiceFunc() {
        //BADGES
        //////5 REPLIES = ACTIVE USER - BRONZE Rank 1 
        //////25 REPLIES = ACTIVE USER - Bronze Rank 2
        //////50 REPLIES = ACTIVE USER - Bronze Rank3
        ///// 75 Replies = active User - Bronze Rank 4
        //// 100 Replies = active User - Silver Rank 1 
        //// 130 Replies = Active User - Silver Rank 2 
        //// 165 Replies = Active User - Silver Rank 3 
        //// 215 Replies = Active User - Silver Rank 4 
        /// 235 Replies = Active User - Gold Rank 1
        //// 275 Replies = Active User - Gold Rank 2 
        /// 315 Replies = Active User - Gold Rank 3 
        /// 350 Replies = Active user - Gold Rank 4
        //// 401+ Replies = Active User - ? Rank 




        //2 Topics Bronze 1 
        //10 Bronze Rank 2 
        //15  Bronze Rank 3 
        //20 Bronze Rank 4 
        // 25 Silver Rank 1 
        // 35 Silver Rank 2 
        // 50 silver Rank 3 
        // 75 silver Rank 4  
        // 100 Gold  Rank 1 
        // 125 Gold Rank 2 
        // 150 Gold Rank 3 
        // 175 Gold Rank4 
        // 200 Plat Rank1  
        // 240 Plat Rank2 
        // 275 plat Rank3 
        // 300 plat Rank4 



        //1st day bronze 1
        //5day bronze 2
        //20day bronze 3
        //30day bronze 4
        //50day silver 1
        //100day silver 2
        //120day silver 3
        //150day silver 4
        //200day gold 1
        //225day gold 2
        //250day gold 3
        //275 day gold 4
        //280 day platunum 1
        //300day playinum 2
        //330 day playinum 3
        //350 day platinum 4


        this.getDaysVisitedBadges = function() {

            return ({

                daysVisited: {

                    bronze: {

                        rankone: {
                            Title: "New Comer |",
                            Type: "Bronze",
                            Rank: "Rank1",
                            Days: 1,
                            pushObj: {
                                activeUser: {
                                    rankone: {
                                        Title: "New Comer |",
                                        Type: "Bronze",
                                        Rank: "Rank1",
                                        Days: 1,
                                    }
                                }
                            }

                        },

                        ranktwo: {

                            Title: "New Comer ||",
                            Type: "Bronze",
                            Rank: "Rank2",
                            Days: 5,
                            pushObj: {
                                activeUser: {
                                    rankone: {
                                        Title: "New Comer ||",
                                        Type: "Bronze",
                                        Rank: "Rank2",
                                        Days: 5,
                                    }
                                }
                            }

                        },

                        rankthree: {

                            Title: "New Comer |||",
                            Type: "Bronze",
                            Rank: "Rank3",
                            Days: 20,
                            pushObj: {
                                activeUser: {
                                    rankone: {
                                        Title: "New Comer |||",
                                        Type: "Bronze",
                                        Rank: "Rank3",
                                        Days: 20,
                                    }
                                }
                            }

                        },

                        rankfour: {

                            Title: "New Comer ||||",
                            Type: "Bronze",
                            Rank: "Rank4",
                            Days: 30,
                            pushObj: {
                                activeUser: {
                                    rankone: {
                                        Title: "New Comer ||||",
                                        Type: "Bronze",
                                        Rank: "Rank4",
                                        Days: 30,
                                    }
                                }
                            }

                        },

                    },
                    silver: {

                        rankone: {

                            Title: "Moderate Comer |",
                            Type: "Silver",
                            Rank: "Rank1",
                            Days: 50,
                            pushObj: {
                                activeUser: {
                                    rankone: {
                                        Title: "Moderate Comer |",
                                        Type: "Silver",
                                        Rank: "Rank1",
                                        Days: 50,
                                    }
                                }
                            }

                        },

                        ranktwo: {

                            Title: "Moderate Comer ||",
                            Type: "Silver",
                            Rank: "Rank2",
                            Days: 100,
                            pushObj: {
                                activeUser: {
                                    rankone: {
                                        Title: "Moderate Comer ||",
                                        Type: "Silver",
                                        Rank: "Rank2",
                                        Days: 100,
                                    }
                                }
                            }

                        },

                        rankthree: {

                            Title: "Moderate Comer |||",
                            Type: "Silver",
                            Rank: "Rank3",
                            Days: 120,
                            pushObj: {
                                activeUser: {
                                    rankone: {
                                        Title: "Moderate Comer |||",
                                        Type: "Silver",
                                        Rank: "Rank3",
                                        Days: 120,
                                    }
                                }
                            }

                        },

                        rankfour: {

                            Title: "Moderate Comer ||||",
                            Type: "Silver",
                            Rank: "Rank4",
                            Days: 150,
                            pushObj: {
                                activeUser: {
                                    rankone: {
                                        Title: "Moderate Comer ||||",
                                        Type: "Silver",
                                        Rank: "Rank4",
                                        Days: 150,
                                    }
                                }
                            }

                        },

                    },
                    gold: {

                        rankone: {

                            Title: "Welcome Back |",
                            Type: "Gold",
                            Rank: "Rank1",
                            Days: 200,
                            pushObj: {
                                activeUser: {
                                    rankone: {
                                        Title: "Welcome Back |",
                                        Type: "Gold",
                                        Rank: "Rank1",
                                        Days: 200,
                                    }
                                }
                            }

                        },

                        ranktwo: {


                            Title: "Welcome Back ||",
                            Type: "Gold",
                            Rank: "Rank2",
                            Days: 225,
                            pushObj: {
                                activeUser: {
                                    rankone: {
                                        Title: "Welcome Back ||",
                                        Type: "Gold",
                                        Rank: "Rank2",
                                        Days: 225,
                                    }
                                }
                            }

                        },

                        rankthree: {

                            Title: "Welcome Back |||",
                            Type: "Gold",
                            Rank: "Rank3",
                            Days: 250,
                            pushObj: {
                                activeUser: {
                                    rankone: {
                                        Title: "Welcome Back |||",
                                        Type: "Gold",
                                        Rank: "Rank3",
                                        Days: 250,
                                    }
                                }
                            }

                        },

                        rankfour: {

                            Title: "Welcome Back ||||",
                            Type: "Gold",
                            Rank: "Rank4",
                            Days: 275,
                            pushObj: {
                                activeUser: {
                                    rankone: {
                                        Title: "Welcome Back ||||",
                                        Type: "Gold",
                                        Rank: "Rank4",
                                        Days: 275,
                                    }
                                }
                            }

                        },

                    },
                    platinum: {

                        rankone: {

                            Title: "Oldie |",
                            Type: "Platinum",
                            Rank: "Rank1",
                            Days: 280,
                            pushObj: {
                                activeUser: {
                                    rankone: {
                                        Title: "Oldie |",
                                        Type: "Platinum",
                                        Rank: "Rank1",
                                        Days: 280,
                                    }
                                }
                            }

                        },

                        ranktwo: {

                            Title: "Oldie ||",
                            Type: "Platinum",
                            Rank: "Rank2",
                            Days: 300,
                            pushObj: {
                                activeUser: {
                                    rankone: {
                                        Title: "Oldie ||",
                                        Type: "Platinum",
                                        Rank: "Rank2",
                                        Days: 300,
                                    }
                                }
                            }


                        },

                        rankthree: {

                            Title: "Oldie |||",
                            Type: "Platinum",
                            Rank: "Rank3",
                            Days: 330,
                            pushObj: {
                                activeUser: {
                                    rankone: {
                                        Title: "Oldie |||",
                                        Type: "Platinum",
                                        Rank: "Rank3",
                                        Days: 330,
                                    }
                                }
                            }


                        },

                        rankfour: {

                            Title: "Oldie ||||",
                            Type: "Platinum",
                            Rank: "Rank4",
                            Days: 350,
                            pushObj: {
                                activeUser: {
                                    rankone: {
                                        Title: "Oldie ||||",
                                        Type: "Platinum",
                                        Rank: "Rank4",
                                        Days: 350,
                                    }
                                }
                            }


                        },

                    },

                }
            })

        }


        this.getTopicBadges = function() {
            return ({
                questionLover: {

                    bronze: {
                        rankone: {
                            Title: "Question Lover |",
                            Type: "Bronze",
                            Rank: "Rank1",
                            Topics: 2,
                            pushObj: {
                                activeUser: {
                                    rankone: {
                                        Title: "Question Lover |",
                                        Type: "Bronze",
                                        Rank: "Rank1",
                                        Topics: 2,
                                    }
                                }
                            }
                        },
                        ranktwo: {

                            Title: "Question Lover ||",
                            Type: "Bronze",
                            Rank: "Rank2",
                            Topics: 10,
                            pushObj: {
                                activeUser: {
                                    rankone: {
                                        Title: "Question Lover ||",
                                        Type: "Bronze",
                                        Rank: "Rank2",
                                        Topics: 10,
                                    }
                                }
                            },
                        },
                        rankthree: {
                            Title: "Question Lover |||",
                            Type: "Bronze",
                            Rank: "Rank2",
                            Topics: 15,
                            pushObj: {
                                activeUser: {
                                    rankone: {
                                        Title: "Question Lover |||",
                                        Type: "Bronze",
                                        Rank: "Rank3",
                                        Topics: 15,
                                    }
                                }
                            },
                        },
                        rankfour: {
                            Title: "Question Lover ||||",
                            Type: "Bronze",
                            Rank: "Rank4",
                            Topics: 20,
                            pushObj: {
                                activeUser: {
                                    rankone: {
                                        Title: "Question Lover ||||",
                                        Type: "Bronze",
                                        Rank: "Rank4",
                                        Topics: 20,
                                    }
                                }

                            }
                        },
                    },
                    silver: {
                        rankone: {

                            Title: "Questionare |",
                            Type: "Silver",
                            Rank: "Rank1",
                            Topics: 25,
                            pushObj: {
                                activeUser: {
                                    rankone: {
                                        Title: "Questionare |",
                                        Type: "Silver",
                                        Rank: "Rank1",
                                        Topics: 25,
                                    }
                                }

                            }



                        },
                        ranktwo: {

                            Title: "Questionare ||",
                            Type: "Silver",
                            Rank: "Rank2",
                            Topics: 35,
                            pushObj: {
                                activeUser: {
                                    rankone: {
                                        Title: "Questionare ||",
                                        Type: "Silver",
                                        Rank: "Rank2",
                                        Topics: 35,
                                    }
                                }

                            }

                        },
                        rankthree: {
                            Title: "Questionare |||",
                            Type: "Silver",
                            Rank: "Rank3",
                            Topics: 50,
                            pushObj: {
                                activeUser: {
                                    rankone: {
                                        Title: "Questionare |||",
                                        Type: "Silver",
                                        Rank: "Rank3",
                                        Topics: 50,
                                    }
                                }

                            }
                        },
                        rankfour: {
                            Title: "Questionare ||||",
                            Type: "Silver",
                            Rank: "Rank4",
                            Topics: 75,
                            pushObj: {
                                activeUser: {
                                    rankone: {
                                        Title: "Questionare ||||",
                                        Type: "Silver",
                                        Rank: "Rank4",
                                        Topics: 75,
                                    }
                                }

                            }

                        }
                    },
                    gold: {
                        rankone: {
                            Title: "Monsterous |",
                            Type: "Gold",
                            Rank: "Rank1",
                            Topics: 100,
                            pushObj: {
                                activeUser: {
                                    rankone: {
                                        Title: "Monsterous |",
                                        Type: "Gold",
                                        Rank: "Rank1",
                                        Topics: 100,
                                    }
                                }

                            }
                        },
                        ranktwo: {
                            Title: "Monsterous ||",
                            Type: "Gold",
                            Rank: "Rank2",
                            Topics: 125,
                            pushObj: {
                                activeUser: {
                                    rankone: {
                                        Title: "Monsterous ||",
                                        Type: "Gold",
                                        Rank: "Rank2",
                                        Topics: 125,
                                    }
                                }

                            }
                        },
                        rankthree: {
                            Title: "Monsterous |||",
                            Type: "Gold",
                            Rank: "Rank3",
                            Topics: 150,
                            pushObj: {
                                activeUser: {
                                    rankone: {
                                        Title: "Monsterous |||",
                                        Type: "Gold",
                                        Rank: "Rank3",
                                        Topics: 150,
                                    }
                                }
                            }
                        },
                        rankfour: {
                            Title: "Monsterous ||||",
                            Type: "Gold",
                            Rank: "Rank4",
                            Topics: 175,
                            pushObj: {
                                activeUser: {
                                    rankone: {
                                        Title: "Monsterous ||||",
                                        Type: "Gold",
                                        Rank: "Rank4",
                                        Topics: 175,
                                    }
                                }
                            }
                        }
                    },
                    platinum: {
                        rankone: {
                            Title: "Crusher |",
                            Type: "Platinum",
                            Rank: "Rank1",
                            Topics: 200,
                            pushObj: {
                                activeUser: {
                                    rankone: {
                                        Title: "Crusher |",
                                        Type: "Platinum",
                                        Rank: "Rank1",
                                        Topics: 200,
                                    }
                                }
                            }
                        },
                        ranktwo: {
                            Title: "Crusher ||",
                            Type: "Platinum",
                            Rank: "Rank2",
                            Topics: 240,
                            pushObj: {
                                activeUser: {
                                    rankone: {
                                        Title: "Crusher ||",
                                        Type: "Platinum",
                                        Rank: "Rank2",
                                        Topics: 240,
                                    }
                                }

                            }

                        },
                        rankthree: {
                            Title: "Crusher |||",
                            Type: "Platinum",
                            Rank: "Rank3",
                            Topics: 275,
                            pushObj: {
                                activeUser: {
                                    rankone: {
                                        Title: "Crusher |||",
                                        Type: "Platinum",
                                        Rank: "Rank3",
                                        Topics: 275,
                                    }
                                }
                            }
                        },
                        rankfour: {
                            Title: "Crusher ||||",
                            Type: "Platinum",
                            Rank: "Rank4",
                            Topics: 300,
                            pushObj: {
                                activeUser: {
                                    rankone: {
                                        Title: "Crusher ||||",
                                        Type: "Platinum",
                                        Rank: "Rank4",
                                        Topics: 300,
                                    }
                                }

                            }

                        }
                    }


                }
            })
        }

        this.getReplyBadges = function() {
            return ({
                activeUser: {
                    bronze: {
                        rankone: {
                            Title: "Active User",
                            Type: "Bronze",
                            Rank: "Rank1",
                            Replies: 5,
                            pushObj: {
                                activeUser: {
                                    rankone: {
                                        Title: "Active User",
                                        Type: "Bronze",
                                        Rank: "Rank1",
                                        Replies: 5,
                                    }
                                }
                            }
                        },
                        ranktwo: {
                            Title: "Active User",
                            Type: "Bronze",
                            Rank: "Rank2",
                            Replies: 25,
                            pushObj: {
                                activeUser: {
                                    ranktwo: {
                                        Title: "Active User",
                                        Type: "Bronze",
                                        Rank: "Rank2",
                                        Replies: 25,
                                    }
                                }
                            }
                        },
                        rankthree: {
                            Title: "Active User",
                            Type: "Bronze",
                            Rank: "Rank3",
                            Replies: 50,
                            pushObj: {
                                activeUser: {
                                    rankthree: {
                                        Title: "Active User",
                                        Type: "Bronze",
                                        Rank: "Rank3",
                                        Replies: 50,
                                    }
                                }
                            }
                        },
                        rankfour: {
                            Title: "Active User",
                            Type: "Bronze",
                            Rank: "Rank4",
                            Replies: 75,
                            pushObj: {
                                activeUser: {
                                    rankfour: {
                                        Title: "Active User",
                                        Type: "Bronze",
                                        Rank: "Rank4",
                                        Replies: 75,
                                    }
                                }
                            }
                        },
                    },
                    silver: {
                        rankone: {
                            Title: "Active User",
                            Type: "Silver",
                            Rank: "Rank1",
                            Replies: 100,
                            pushObj: {
                                activeUser: {
                                    rankone: {
                                        Title: "Active User",
                                        Type: "Silver",
                                        Rank: "Rank1",
                                        Replies: 100,
                                    }
                                }
                            }
                        },
                        ranktwo: {
                            Title: "Active User",
                            Type: "Silver",
                            Rank: "Rank2",
                            Replies: 130,
                            pushObj: {
                                activeUser: {
                                    ranktwo: {
                                        Title: "Active User",
                                        Type: "Silver",
                                        Rank: "Rank2",
                                        Replies: 130,
                                    }
                                }
                            }
                        },
                        rankthree: {
                            Title: "Active User",
                            Type: "Silver",
                            Rank: "Rank3",
                            Replies: 165,
                            pushObj: {
                                activeUser: {
                                    rankthree: {
                                        Title: "Active User",
                                        Type: "Silver",
                                        Rank: "Rank3",
                                        Replies: 165,
                                    }
                                }
                            }
                        },
                        rankfour: {
                            Title: "Active User",
                            Type: "Silver",
                            Rank: "Rank4",
                            Replies: 215,
                            pushObj: {
                                activeUser: {
                                    rankfour: {
                                        Title: "Active User",
                                        Type: "Silver",
                                        Rank: "Rank4",
                                        Replies: 215,
                                    }
                                }
                            }
                        },
                    },
                    gold: {
                        rankone: {
                            Title: "Active User",
                            Type: "Gold",
                            Rank: "Rank1",
                            Replies: 235,
                            pushObj: {
                                activeUser: {
                                    rankone: {
                                        Title: "Active User",
                                        Type: "Gold",
                                        Rank: "Rank1",
                                        Replies: 235,
                                    }
                                }
                            }
                        },
                        ranktwo: {
                            Title: "Active User",
                            Type: "Gold",
                            Rank: "Rank2",
                            Replies: 275,
                            pushObj: {
                                activeUser: {
                                    ranktwo: {
                                        Title: "Active User",
                                        Type: "Gold",
                                        Rank: "Rank2",
                                        Replies: 275,
                                    }
                                }
                            }
                        },
                        rankthree: {
                            Title: "Active User",
                            Type: "Gold",
                            Rank: "Rank3",
                            Replies: 315,
                            pushObj: {
                                activeUser: {
                                    rankthree: {
                                        Title: "Active User",
                                        Type: "Gold",
                                        Rank: "Rank3",
                                        Replies: 315,
                                    }
                                }
                            }
                        },
                        rankfour: {
                            Title: "Active User",
                            Type: "Gold",
                            Rank: "Rank4",
                            Replies: 350,
                            pushObj: {
                                activeUser: {
                                    rankfour: {
                                        Title: "Active User",
                                        Type: "Gold",
                                        Rank: "Rank4",
                                        Replies: 350,
                                    }
                                }
                            }
                        },
                    },
                    platinum: {
                        rankone: {
                            Title: "Active User",
                            Type: "Platinum",
                            Rank: "Rank1",
                            Replies: 401,
                            pushObj: {
                                activeUser: {
                                    rankone: {
                                        Title: "Active User",
                                        Type: "Platinum",
                                        Rank: "Rank1",
                                        Replies: 401,
                                    }
                                }
                            }
                        },
                        ranktwo: {
                            Title: "Active User",
                            Type: "Platinum",
                            Rank: "Rank2",
                            Replies: 580,
                            pushObj: {
                                activeUser: {
                                    ranktwo: {
                                        Title: "Active User",
                                        Type: "Platinum",
                                        Rank: "Rank2",
                                        Replies: 580,
                                    }
                                }
                            }
                        },
                        rankthree: {
                            Title: "Active User",
                            Type: "Platinum",
                            Rank: "Rank3",
                            Replies: 1000,
                            pushObj: {
                                activeUser: {
                                    rankthree: {
                                        Title: "Active User",
                                        Type: "Platinum",
                                        Rank: "Rank3",
                                        Replies: 1000,
                                    }
                                }
                            }
                        },
                        rankfour: {
                            Title: "Active User",
                            Type: "Platinum",
                            Rank: "Rank4",
                            Replies: 5000,
                            pushObj: {
                                activeUser: {
                                    rankfour: {
                                        Title: "Active User",
                                        Type: "Platinum",
                                        Rank: "Rank4",
                                        Replies: 5000,
                                    }
                                }
                            }

                        },
                    }
                }
            })
        }
    }

})(angular);