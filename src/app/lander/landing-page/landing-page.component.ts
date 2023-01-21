import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {


  title = `Cyclops : Plug-n-Play Devsecops`
  description = `Next Gen. Platform aims to provide extensible plug-n-play tools to integrate with your CI/CD, Ad-Hoc & On Demand security scans & provides a SaaS devsecops sollution . `

  work_process = {
    title: 'How it works?',
    caption: 'Each tool itslef is a sandboxed image which runs in an isolated environment.',
    desc: 'Cyclops provides built-in tools that can easily be installed, customized and extended as per the requirement, and smoothly integrates with your CI/CD pipeline. ',
    icon: '/assets/images/coverimage.svg'

  }

  copyrightTitle = '©2022 Meddler, a Product of Failaan Media Ventures Pvt. Ltd.  Proudly built in India.'

  platforms = {
    title: 'Features',
    types: [
      {
        title: 'Infrastructure',
        desc: 'Meddler allows to perform fully automated external as well as internal infrastructure scan. For internal scans, an agent can be installed in your VPC, that securely communicates with out Cloud Platform.',
        icon: '/assets/images/server.svg'
      },
      {
        title: 'Mobile Apps',
        desc: 'We privide Static, & Dynamic Analysis along with complete Manual VAPT for iOS & Android mobile apps.',
        icon: '/assets/images/mobile.svg'
      },
      {
        title: 'Web Apps',
        desc: 'We privide Static, & Dynamic Analysis along with complete Manual VAPT for Web apps as well as standalone REST APIs.',
        icon: '/assets/images/webapp.svg'
      },
      {
        title: 'Cloud Platforms',
        desc: 'Our experts provides both extenral & internal security assessment for almost all the popular Cloud Vendors (Azure, AWS, GCP, DO, etc.) ',
        icon: '/assets/images/cloudplatforms.svg'
      },
      {
        title: 'Dark Web',
        desc: 'Our spiders constantly scraps and archive raw information from the infamous forums, publicly accessible clipboards, & groups from social media apps, and perform an in-depth analysis to corelate and provide realtime alerts in case we find something interesting fo you.',
        icon: '/assets/images/leakedcredentials.svg'
      },
      {
        title: 'Threat Intelligence',
        desc: 'Our automated external scanners keeps a constant eye on latest CVE, and trigger an alert if that might be applicable to your asset.',
        icon: '/assets/images/threatintelligence.svg'
      },
      {
        title: 'Offsec Training',
        desc: 'Our experts provides end-to-end hands on Training & Certification courses, keenly focussed on real life scenarios, and helps you prepare and strengthen your team.',
        icon: '/assets/images/securitytraining.svg'
      }
    ]
  }



  constructor() { }

  ngOnInit(): void {
  }

}
