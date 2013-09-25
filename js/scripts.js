angular.module("DashboardApp")
    .config(function(RestangularProvider) {
        RestangularProvider.setBaseUrl("/slick/api");
    })
    .controller("HeaderController", function($scope, DashboardConfig) {
        $scope.config = DashboardConfig;
    })
    .controller("DashboardController", function($scope, Restangular, DashboardConfig, $timeout, $sce) {
        $scope.config = DashboardConfig;
        $scope.data = [];
        _.each(DashboardConfig.projects, function(project) {
            project.totalRows = 0;
            _.each(project.versions, function(version){
                project.totalRows = project.totalRows + version.testruns.length;
            });
        });
        _.each(DashboardConfig.projects, function(project) {
            var projCellDone = false;
            _.each(project.versions, function(version){
                var verCellDone = false;
                _.each(version.testruns, function(testrun) {
                    var row = [];
                    if (!projCellDone) {
                        row.push({
                            content: project.name,
                            css: "multi-project-dashboard-project-name",
                            rowspan: project.totalRows
                        });
                        projCellDone = true;
                    }
                    if (!verCellDone) {
                        row.push({
                            content: version.name,
                            css: "multi-project-dashboard-version-name",
                            rowspan: version.testruns.length
                        });
                        verCellDone = true;
                    }
                    row.push({
                        rowspan: 0,
                        css: "multi-project-dashboard-testrun-label",
                        content: testrun.name
                    });
                    testrun.data = {};
                    testrun.data.build = {
                        rowspan: 0,
                        css: "multi-project-dashboard-build-cell",
                        content: " "
                    };
                    testrun.data.date = {
                        rowspan: 0,
                        css: "multi-project-dashboard-date-cell",
                        content: " "
                    };
                    testrun.data.statusbar = {
                        rowspan: 0,
                        css: "multi-project-dashboard-statusbar-cell",
                        content: " "
                    };
                    testrun.data.stats = {
                        rowspan: 0,
                        css: "multi-project-dashboard-stats-cell",
                        content: " ",
                        oldcontent: ""

                    };
                    row.push(testrun.data.stats);
                    row.push(testrun.data.statusbar);
                    row.push(testrun.data.build);
                    row.push(testrun.data.date);

                    $scope.data.push(row);
                });
            });
        });

        $scope.updateData = function() {
            _.each(DashboardConfig.projects, function(project) {
                _.each(project.versions, function(version){
                    _.each(version.testruns, function(testrun) {
                        Restangular.all('testruns').getList({limit: 1, testplanid: testrun.testplanid, releaseid: testrun.releaseid}).then(function(testruns) {
                            testrun.data.build.content = "Build " + testruns[0].build.name;
                            testrun.data.date.content = (new Date(testruns[0].dateCreated)).toLocaleString();
                            testrun.data.stats.content = $sce.trustAsHtml('<a href="/slick/#/reports/testrundetail/' + testruns[0].id + '?only=NO_RESULT" target="_blank" class="result-status-NORESULT">' + (testruns[0].summary.resultsByStatus.NO_RESULT || 0) + '</a>' + ' / '
                                                       + '<a href="/slick/#/reports/testrundetail/' + testruns[0].id + '?only=PASS" target="_blank" class="result-status-PASS">' + (testruns[0].summary.resultsByStatus.PASS || 0) + '</a>' + ' / '
                                                       + '<a href="/slick/#/reports/testrundetail/' + testruns[0].id + '?only=FAIL" target="_blank" class="result-status-FAIL">' + (testruns[0].summary.resultsByStatus.FAIL || 0) + '</a>' + ' / '
                                                       + '<a href="/slick/#/reports/testrundetail/' + testruns[0].id + '?only=SKIPPED" target="_blank" class="result-status-SKIPPED">' + (testruns[0].summary.resultsByStatus.SKIPPED || 0) + '</a>' + ' / '
                                                       + '<a href="/slick/#/reports/testrunsummary/' + testruns[0].id + '" target="_blank" class="result-status-TOTAL">' + (testruns[0].summary.total || 0) + '</a>');
                            if(testrun.data.stats.oldcontent.valueOf() != testrun.data.stats.content.valueOf()) {
                                if(testrun.data.stats.css.indexOf("animate-change") == -1) {
                                    testrun.data.stats.css = testrun.data.stats.css + " animate-change";
                                } else {
                                    testrun.data.stats.css = "multi-project-dashboard-stats-cell";
                                }
                            }
                            testrun.data.stats.oldcontent = testrun.data.stats.content;

                            testrun.data.statusbar.content = $sce.trustAsHtml('<div class="statusbar multi-project-dashboard-statusbar">'
                                                                            + '<div class="statusbar-PASS" style="width:' + ((testruns[0].summary.resultsByStatus.PASS / testruns[0].summary.total) * 1.8).toFixed(2) + 'in;"> </div>'
                                                                            + '<div class="statusbar-FAIL" style="width:' + ((testruns[0].summary.resultsByStatus.FAIL / testruns[0].summary.total) * 1.8).toFixed(2) + 'in;"> </div>'
                                                                            + '<div class="statusbar-SKIPPED" style="width:' + (((testruns[0].summary.resultsByStatus.SKIPPED || 0) / testruns[0].summary.total) * 1.8).toFixed(2) + 'in;"> </div>'
                                                                            + '<div class="statusbar-NORESULT" style="width:' + ((testruns[0].summary.resultsByStatus.NO_RESULT / testruns[0].summary.total) * 1.8).toFixed(2) + 'in;"> </div>'
                                                                            + '</div>');
                        })
                    });
                });
            });
            $timeout($scope.updateData, 15000);
        };

        $scope.updateData();

    });