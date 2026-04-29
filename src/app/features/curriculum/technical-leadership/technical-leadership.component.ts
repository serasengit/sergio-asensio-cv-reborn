import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-technical-leadership',
    templateUrl: './technical-leadership.component.html',
    styleUrls: ['./technical-leadership.component.scss'],
    imports: [TranslateModule, CommonModule, MatIconModule],
})
export class TechnicalLeaderShipComponent {
    technicalLeadershipIcons: string[] = [
        'groups',
        'account_tree',
        'verified',
        'forum',
        'psychology',
        'tips_and_updates',
        'hub',
        'view_kanban',
    ];

    technicalLeadershipTitleKeys: string[] = [
        'curriculum_page.technical_leadership_section.titles.team_leadership',
        'curriculum_page.technical_leadership_section.titles.software_architecture',
        'curriculum_page.technical_leadership_section.titles.technical_quality',
        'curriculum_page.technical_leadership_section.titles.stakeholder_collaboration',
        'curriculum_page.technical_leadership_section.titles.mentoring_code_review',
        'curriculum_page.technical_leadership_section.titles.technological_innovation',
        'curriculum_page.technical_leadership_section.titles.engineering_culture',
        'curriculum_page.technical_leadership_section.titles.agility_value_delivery',
    ];
}
