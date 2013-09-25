/**
 * User: jcorbett
 * Date: 9/18/13
 * Time: 12:25 PM
 */

angular.module("DashboardApp", ["ngAnimate", "restangular", "ngSanitize"])
    .service("DashboardConfig", function() {
        return {
            name: "QA Automation Dashboard",
            projects: [
                {
                    name: "Project1",
                    versions: [
                        {
                            name: "Version 1",
                            testruns: [
                                {
                                    name: "Testrun 1",
                                    testplanid: "50072dbae4b0b743bb3bfd39",
                                    releaseid: "5193c4efe4b0517894d4e293"
                                },
                                {
                                    name: "Testrun 2",
                                    testplanid: "51fb3d11e4b0517894e7d033",
                                    releaseid: "51dc3d0de4b0517894e13004"
                                }
                            ]
                        },
                        {
                            name: "Version 2",
                            testruns: [
                                {
                                    name: "Testrun 1",
                                    testplanid: "50072dbae4b0b743bb3bfd39",
                                    releaseid: "520c083ee4b0f8dba2bad451"
                                },
                                {
                                    name: "Testrun 2",
                                    testplanid: "51fb3d11e4b0517894e7d033",
                                    releaseid: "521e699ce4b0163ce0867e6a"
                                }
                            ]
                        }
                    ]
                },
                {
                    name: "Project2",
                    versions: [
                        {
                            name: "Version 1",
                            testruns: [
                                {
                                    name: "Testrun 1",
                                    testplanid: "50072dbae4b0b743bb3bfd39",
                                    releaseid: "5192f53ae4b0517894d4a9da"
                                },
                                {
                                    name: "Testrun 2",
                                    testplanid: "51ddab02e4b0517894e1aa77",
                                    releaseid: "51dc3d0de4b0517894e13004"
                                }
                            ]
                        },
                        {
                            name: "Version 2",
                            testruns: [
                                {
                                    name: "Testrun 1",
                                    testplanid: "50072dbae4b0b743bb3bfd39",
                                    releaseid: "520961fde4b0f8dba2b9b140"
                                },
                                {
                                    name: "Testrun 2",
                                    testplanid: "51ddab02e4b0517894e1aa77",
                                    releaseid: "521e699ce4b0163ce0867e6a"
                                }
                            ]
                        }
                    ]
                },
                {
                    name: "Project3",
                    versions: [
                        {
                            name: "Version 1",
                            testruns: [
                                {
                                    name: "Testrun 1",
                                    testplanid: "50072dbae4b0b743bb3bfd39",
                                    releaseid: "50e75416e4b02c8dc6ad959b"
                                },
                                {
                                    name: "Testrun 2",
                                    testplanid: "520924bbe4b0f8dba2b9a109",
                                    releaseid: "51dc3d0de4b0517894e13004"
                                }
                            ]
                        },
                        {
                            name: "Version 2",
                            testruns: [
                                {
                                    name: "Testrun 1",
                                    testplanid: "50072dbae4b0b743bb3bfd39",
                                    releaseid: "520bdc09e4b0f8dba2baa637"
                                },
                                {
                                    name: "Testrun 2",
                                    testplanid: "520924bbe4b0f8dba2b9a109",
                                    releaseid: "521e699ce4b0163ce0867e6a"
                                }
                            ]
                        }
                    ]
                }
            ]
        };
    });
