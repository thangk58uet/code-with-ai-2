import { Component, OnInit } from '@angular/core';
import { Document } from '../document-card/document-card.component';

@Component({
  selector: 'app-dochub-homepage',
  templateUrl: './dochub-homepage.component.html',
  styleUrls: ['./dochub-homepage.component.scss']
})
export class DochubHomepageComponent implements OnInit {
  latestDocuments: Document[] = [];
  featuredDocuments: Document[] = [];
  myDocuments: Document[] = [];

  ngOnInit() {
    this.initializeDocuments();
  }

  private initializeDocuments() {
    // Latest Documents
    this.latestDocuments = [
      {
        id: '1',
        title: 'Q4 Financial Report',
        category: 'Finance',
        description: 'Comprehensive financial analysis for the fourth quarter including revenue trends, cost optimization strategies, and market performance insights.',
        author: 'Sarah Johnson',
        date: 'Jan 15, 2025'
      },
      {
        id: '2',
        title: 'Product Roadmap 2025',
        category: 'Product',
        description: 'Strategic product development plan outlining key features, milestones, and innovation initiatives for the upcoming year.',
        author: 'Mike Chen',
        date: 'Jan 12, 2025'
      },
      {
        id: '3',
        title: 'Employee Handbook Update',
        category: 'HR',
        description: 'Updated company policies, remote work guidelines, and new benefits information for all employees.',
        author: 'Lisa Martinez',
        date: 'Jan 10, 2025'
      },
      {
        id: '4',
        title: 'Security Audit Results',
        category: 'Security',
        description: 'Detailed security assessment findings, vulnerability analysis, and recommended action plans for system improvements.',
        author: 'David Kim',
        date: 'Jan 8, 2025'
      },
      {
        id: '5',
        title: 'Marketing Campaign Analysis',
        category: 'Marketing',
        description: 'Performance metrics and ROI analysis for recent marketing campaigns across digital and traditional channels.',
        author: 'Emma Wilson',
        date: 'Jan 5, 2025'
      }
    ];

    // Featured Documents
    this.featuredDocuments = [
      {
        id: '6',
        title: 'Company Culture Guide',
        category: 'Culture',
        description: 'Essential guide to our company values, culture, and best practices for building a positive work environment.',
        author: 'Jennifer',
        date: 'Dec 20, 2024',
        rating: 4.9
      },
      {
        id: '7',
        title: 'API Documentation v3.0',
        category: 'Technical',
        description: 'Complete technical documentation for our REST API including endpoints, authentication, and integration examples.',
        author: 'Alex',
        date: 'Dec 18, 2024',
        rating: 4.8
      },
      {
        id: '8',
        title: 'Customer Success Playbook',
        category: 'Customer',
        description: 'Proven strategies and frameworks for customer onboarding, retention, and satisfaction improvement.',
        author: 'Maria',
        date: 'Dec 15, 2024',
        rating: 4.7
      },
      {
        id: '9',
        title: 'Design System Guidelines',
        category: 'Design',
        description: 'Comprehensive design system documentation including components, patterns, and visual standards.',
        author: 'Tom',
        date: 'Dec 12, 2024',
        rating: 4.6
      },
      {
        id: '10',
        title: 'Data Privacy Compliance',
        category: 'Legal',
        description: 'GDPR and privacy compliance guidelines, data handling procedures, and legal requirements documentation.',
        author: 'Rachel',
        date: 'Dec 10, 2024',
        rating: 4.5
      }
    ];

  this.myDocuments = [
    {
      id: '11',
      title: 'Hướng dẫn sử dụng hệ thống',
      category: 'Hỗ trợ',
      description: 'Tài liệu hướng dẫn chi tiết cách sử dụng các chức năng chính của hệ thống.',
      author: 'Nguyễn Văn A',
      date: 'Dec 22, 2024',
      rating: 4.9
    },
    {
      id: '12',
      title: 'Báo cáo kết quả quý IV',
      category: 'Báo cáo',
      description: 'Tổng hợp kết quả hoạt động kinh doanh quý IV năm 2024.',
      author: 'Trần Thị B',
      date: 'Dec 19, 2024',
      rating: 4.7
    },
    {
      id: '13',
      title: 'Chính sách phúc lợi mới',
      category: 'Nhân sự',
      description: 'Thông tin về các chính sách phúc lợi mới áp dụng từ năm 2025.',
      author: 'Lê Văn C',
      date: 'Dec 17, 2024',
      rating: 4.8
    },
    {
      id: '14',
      title: 'Quy trình xin nghỉ phép',
      category: 'Quy trình',
      description: 'Các bước thực hiện và lưu ý khi xin nghỉ phép trong công ty.',
      author: 'Phạm Thị D',
      date: 'Dec 14, 2024',
      rating: 4.6
    },
    {
      id: '15',
      title: 'Tổng hợp câu hỏi thường gặp',
      category: 'FAQ',
      description: 'Danh sách các câu hỏi thường gặp và giải đáp liên quan đến công việc.',
      author: 'Vũ Minh E',
      date: 'Dec 11, 2024',
      rating: 4.5
    }
  ];
  }

  onDocumentSelected(document: Document) {
    console.log('Document selected:', document);
    // Implement navigation to document details
  }
}
