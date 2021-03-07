Tools-Management:
    Create Tool
        API: Source, Sink, Id (Push)
        Docker (Pull)
        Manual / Report (Uplaod )
        

Assets:

    Hosts
        Public
            -   No Tunnel
            -   via Tunnel
        Private
            -   No Tunnel
            -   via Tunnel
    Domains
        Subdomains


    Android
        APK
        Playstore



    iOS
        IPA
        Appstore

    Web
        Web Application
            URL
            Source Code
        Wordpress


    Code Repositories
        Github
            Public
            Private
        Bitbucket
            Public
            Private

    Docker Images
        Public Repository
        Private Repository







## Tools:
    Every tool needs to be a Docker containers with custom configuration.
    Plan:
        Private Repository
        Customization via yaml
        Define input, output
        Define dependencies
        Have unit test to make sure it is working
        Deploy

        Export all tools to deploy the infra to new tenant

        
## Data Sources / Sink:
    Each tool can be mapped to a data source & sink
    Every tool is a docker container.
    All the required inputs can be provided in of the ways:
        1. Filesystem:
            All the inputs will reside in files
            Location to these files would although remain fixed, but pth can be obtained via Environment variables
            All the outputs should go in the filesystem
            Data files (json, csv, etc.) can directly be stored in the disk, and later will be synced with the database via watchdog
            Watchdog would also be respinsible for cleaning the file system.
            
        2. Func. Call

<!--  -->
deployment:
    images
    builds



<!-- Tokens -->
7a9203adcb56361fd49829b73b28293f454a1e73