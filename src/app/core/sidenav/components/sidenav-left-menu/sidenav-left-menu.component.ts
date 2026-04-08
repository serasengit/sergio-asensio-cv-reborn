import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output, TemplateRef, viewChild } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { Module } from '@core/models/module.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-sidenav-left-menu',

    imports: [NgTemplateOutlet, MatListModule, MatExpansionModule, MatIconModule, TranslateModule, RouterModule],
    templateUrl: './sidenav-left-menu.component.html',
    styleUrls: ['./sidenav-left-menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavLeftMenuComponent {
    readonly modules = input<Module[]>();
    readonly activeModule = input<Module>();

    readonly changeModule = output<Module>();

    readonly flatModule = viewChild.required<TemplateRef<unknown>>('flatModule');
    readonly expandableModule = viewChild.required<TemplateRef<unknown>>('expandableModule');

    getTemplateForModule(module: Module): TemplateRef<unknown> | undefined {
        return module?.modules?.length > 0 ? this.expandableModule() : this.flatModule();
    }

    public isModuleInModule(module: Module): boolean {
        if (!module || !this.activeModule()) return false;
        if (module.code === this.activeModule().code) return true;
        return module.modules?.some((sub) => sub.code === this.activeModule().code) ?? false;
    }
}
