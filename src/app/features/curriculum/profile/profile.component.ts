import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    imports: [TranslateModule, CommonModule, MatIconModule],
})
export class ProfileComponent {
    profileIcons: string[] = ['groups', 'account_tree', 'verified', 'forum', 'psychology', 'tips_and_updates', 'hub', 'view_kanban'];

    profileTitleKeys: string[] = [
        'curriculum_page.profile_section.titles.team_leadership',
        'curriculum_page.profile_section.titles.software_architecture',
        'curriculum_page.profile_section.titles.technical_quality',
        'curriculum_page.profile_section.titles.stakeholder_collaboration',
        'curriculum_page.profile_section.titles.mentoring_code_review',
        'curriculum_page.profile_section.titles.technological_innovation',
        'curriculum_page.profile_section.titles.engineering_culture',
        'curriculum_page.profile_section.titles.agility_value_delivery',
    ];
}
