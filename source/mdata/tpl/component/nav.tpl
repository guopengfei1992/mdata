<nav class="nav" ng-controller="navigationCtrl" ng-if="!outlineHide">
    <ul class="nav_list">
        <li class="nav_list_item" ng-class="{'nav_list_item-active' : page == 'application'}">
            <a href="#/application/manage">
                <i class="iconfont icon-application"></i>
                <p>Application</p>
            </a>
        </li>
        <li class="nav_list_item" ng-class="{'nav_list_item-active' : page == 'channel'}">
            <a href="#/channel/manage">
                <i class="iconfont icon-channel"></i>
                <p>Channel</p>
            </a>
        </li>
        <li class="nav_list_item" ng-class="{'nav_list_item-active' : page == 'account'}">
            <a href="#/account/manage">
                <i class="iconfont icon-account"></i>
                <p>Account</p>
            </a>
        </li>
        <li class="nav_list_item" ng-class="{'nav_list_item-active' : page == 'systemLog'}">
            <a href="#/systemLog">
                <i class="iconfont icon-system"></i>
                <p>System log</p>
            </a>
        </li>
        <li class="nav_list_item" ng-class="{'nav_list_item-active' : page == 'report'}">
            <a href="#/report/manage">
                <i class="iconfont icon-report"></i>
                <p>Report</p>
            </a>
        </li>
    </ul>
    <section class="shortcuts">
        <div class="shortcuts-title">
            <i class="iconfont icon-report"></i>
            <p>Shortcuts</p>
            <i class="iconfont icon-arrow-samll-up"></i>
        </div>
        <dl class="shortcuts-list">
            <dt class="shortcuts-list_app">app1</dt>
            <dd class="shortcuts-list_report">report1</dd>
        </dl>
        <dl class="shortcuts-list">
            <dt class="shortcuts-list_app">app2</dt>
            <dd class="shortcuts-list_report">report2</dd>
            <dd class="shortcuts-list_report">report3</dd>
        </dl>
    </section>
</nav>