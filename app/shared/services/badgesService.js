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



        this.getReplyBadges = function() {
            return ({
                activeUser: {
                    bronze: {
                        rankone:  {
                            Title: "Active User",
                            Type: "Bronze",
                            Rank: "Rank1",
                            Replies : 5,
                            pushObj : {
                                activeUser : {
                                    rankone : {
                                         Title: "Active User",
                                         Type: "Bronze",
                                         Rank: "Rank1",
                                         Replies : 5,
                                    }
                                }
                            }
                        },
                        ranktwo: {
                            Title: "Active User",
                            Type: "Bronze",
                            Rank: "Rank2",
                            Replies: 25,
                             pushObj : {
                                activeUser : {
                                    ranktwo : {
                                         Title: "Active User",
                                         Type: "Bronze",
                                         Rank: "Rank2",
                                         Replies : 25,
                                    }
                                }
                            }
                        },
                        rankthree: {
                            Title: "Active User",
                            Type: "Bronze",
                            Rank: "Rank3",
                            Replies:50,
                            pushObj : {
                                activeUser : {
                                    rankthree : {
                                         Title: "Active User",
                                         Type: "Bronze",
                                         Rank: "Rank3",
                                         Replies : 50,
                                    }
                                }
                            }
                        },
                        rankfour: {
                            Title: "Active User",
                            Type: "Bronze",
                            Rank: "Rank4",
                            Replies:75,
                            pushObj : {
                                activeUser : {
                                      rankfour: {
                                            Title: "Active User",
                                            Type: "Bronze",
                                            Rank: "Rank4",
                                            Replies:75,  
                                      }
                                  }
                              }
                        },
                    },
                    silver: {
                        rankone:  {
                            Title: "Active User",
                            Type: "Silver",
                            Rank: "Rank1",
                            Replies:100,
                            pushObj : {
                                activeUser : {
                                    rankone : {
                                         Title: "Active User",
                                         Type: "Silver",
                                         Rank: "Rank1",
                                         Replies : 100,
                                    }
                                }
                            }
                        },
                        ranktwo: {
                            Title: "Active User",
                            Type: "Silver",
                            Rank: "Rank2",
                            Replies: 130,
                            pushObj : {
                                activeUser : {
                                    ranktwo : {
                                         Title: "Active User",
                                         Type: "Silver",
                                         Rank: "Rank2",
                                         Replies : 130,
                                    }
                                }
                            }
                        },
                        rankthree: {
                            Title: "Active User",
                            Type: "Silver",
                            Rank: "Rank3",
                            Replies:165,
                            pushObj : {
                                activeUser : {
                                    rankthree : {
                                         Title: "Active User",
                                         Type: "Silver",
                                         Rank: "Rank3",
                                         Replies : 165,
                                    }
                                }
                            }
                        },
                        rankfour: {
                            Title: "Active User",
                            Type: "Silver",
                            Rank: "Rank4",
                            Replies:  215,
                            pushObj : {
                                activeUser : {
                                    rankfour : {
                                         Title: "Active User",
                                         Type: "Silver",
                                         Rank: "Rank4",
                                         Replies : 215,
                                    }
                                }
                            }
                        },
                    },
                    gold: {
                        rankone:  {
                            Title: "Active User",
                            Type: "Gold",
                            Rank: "Rank1",
                            Replies: 235,
                            pushObj : {
                                activeUser : {
                                    rankone : {
                                         Title: "Active User",
                                         Type: "Gold",
                                         Rank: "Rank1",
                                         Replies : 235,
                                    }
                                }
                            }
                        },
                        ranktwo: {
                            Title: "Active User",
                            Type: "Gold",
                            Rank: "Rank2",
                            Replies: 275,
                            pushObj : {
                                activeUser : {
                                    ranktwo : {
                                         Title: "Active User",
                                         Type: "Gold",
                                         Rank: "Rank2",
                                         Replies : 275,
                                    }
                                }
                            }
                        },
                        rankthree: {
                            Title: "Active User",
                            Type: "Gold",
                            Rank: "Rank3",
                            Replies: 315,
                            pushObj : {
                                activeUser : {
                                    rankthree : {
                                         Title: "Active User",
                                         Type: "Gold",
                                         Rank: "Rank3",
                                         Replies : 315,
                                    }
                                }
                            }
                        },
                        rankfour: {
                            Title: "Active User",
                            Type: "Gold",
                            Rank: "Rank4",
                            Replies : 350,
                            pushObj : {
                                activeUser : {
                                    rankfour : {
                                         Title: "Active User",
                                         Type: "Gold",
                                         Rank: "Rank4",
                                         Replies : 350,
                                    }
                                }
                            }
                        },
                    },
                    platinum : {
                        rankone:  {
                            Title: "Active User",
                            Type: "Platinum",
                            Rank: "Rank1",
                            Replies : 401,
                            pushObj : {
                                activeUser : {
                                    rankone : {
                                         Title: "Active User",
                                         Type: "Platinum",
                                         Rank: "Rank1",
                                         Replies : 401,
                                    }
                                }
                            }
                        },
                        ranktwo: {
                            Title: "Active User",
                            Type: "Platinum",
                            Rank: "Rank2",
                            Replies : 580,
                            pushObj : {
                                activeUser : {
                                    ranktwo : {
                                         Title: "Active User",
                                         Type: "Platinum",
                                         Rank: "Rank2",
                                         Replies : 580,
                                    }
                                }
                            }
                        },
                        rankthree: {
                            Title: "Active User",
                            Type: "Platinum",
                            Rank: "Rank3",
                            Replies : 1000,
                            pushObj : {
                                activeUser : {
                                    rankthree : {
                                         Title: "Active User",
                                         Type: "Platinum",
                                         Rank: "Rank3",
                                         Replies : 1000,
                                    }
                                }
                            }
                        },
                        rankfour: {
                            Title: "Active User",
                            Type: "Platinum",
                            Rank: "Rank4",
                            Replies : 5000,
                             pushObj : {
                                activeUser : {
                                    rankfour : {
                                         Title: "Active User",
                                         Type: "Platinum",
                                         Rank: "Rank4",
                                         Replies : 5000,
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