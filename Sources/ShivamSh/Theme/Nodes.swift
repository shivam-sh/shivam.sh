import Publish
import Plot

// Generate custom nodes to make programming easier through abstractions
public extension Node where Context == HTML.BodyContext {
    
    static func wrapper(_ nodes: Node...) -> Node {
        .div(.class("wrapper"), .group(
            nodes
        ))
    }
    
    static func header<T: Website>(for context: PublishingContext<T>) -> Node {
        return .header(
            .a(
                .href(context.site.url),
                .img(.class("navLogo"),.src("/images/Site Logo.png"))
            ),
            .nav(
                .a(
                    .text("BLOG"),
                    .href("/posts")
                ),
                .span(.class("spacer")," / "),
                .a(
                    .text("PROJECTS"),
                    .href("/projects")
                ),
                .span(.class("spacer")," / "),
                .a(
                    .text("ABOUT ME"),
                    .href("/about")
                )
            )
        )
    }
    
    static func banner(_ nodes: Node...) -> Node {
        .div(.class("banner"),
            .group(nodes)
        )
    }
    
    static func flex(_ nodes: Node...) -> Node {
        .div(.class("flex"), .group(
            nodes
        ))
    }
    
    static func block(_ nodes: Node...) -> Node {
        .div(.class("block"), .group(
            nodes
        ))
    }
    
    static func content(_ nodes: Node...) -> Node {
        .div(.class("content"), .group(
            nodes
        ))
    }
    
    static func footer<T: Website>(for site: T) -> Node {
        .footer(
            .ul(
                .class("icons"),
                .li(.a(.class("fab fa-github"),.href("https://github.com/shivam-sh"))),
                .li(.a(.class("fab fa-linkedin-in"),.href("https://linkedin.com/shivam-sh")))
            ),
            .p("© Shivam Sharma")
        )
    }
}

public extension Node where Context == HTML.DocumentContext {
    static func head<T: Website>(
        for location: Location,
        on site: T,
        titleSeparator: String = " | ",
        stylesheetPaths: [Path] = ["css/styles.css"],
        rssFeedPath: Path? = .defaultForRSSFeed,
        rssFeedTitle: String? = nil
    ) -> Node {
        var title = location.title

        if title.isEmpty {
            title = site.name
        } else {
            title.append(titleSeparator + site.name)
        }

        var description = location.description

        if description.isEmpty {
            description = site.description
        }

        return .head(
            .encoding(.utf8),
            .siteName(site.name),
            .url(site.url(for: location)),
            .title(title),
            .description(description),
            .twitterCardType(location.imagePath == nil ? .summary : .summaryLargeImage),
            .forEach(stylesheetPaths, { .stylesheet($0) }),
            .viewport(.accordingToDevice),
            .unwrap(site.favicon, { .favicon($0) }),
            .link(.href("https://fonts.googleapis.com/css2?family=Baloo+Tamma+2&family=Comfortaa&family=Open+Sans&family=Quicksand&family=Recursive&family=Roboto+Mono&family=Share+Tech+Mono&family=Source+Sans+Pro&display=swap"),.rel(HTMLLinkRelationship(rawValue: "stylesheet")!)),
            /*
            .link(.href("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap")),
            .link(.href("https://fonts.googleapis.com/css2?family=Quicksand&display=swap")),
            .link(.href("https://fonts.googleapis.com/css2?family=Recursive&display=swap")),
            .link(.href("https://fonts.googleapis.com/css2?family=Baloo+Tamma+2&display=swap")),
             */
            .script(.src("https://kit.fontawesome.com/6bcb0fd0dc.js"))
            /*
            .unwrap(rssFeedPath, { path in
                let title = rssFeedTitle ?? "Subscribe to \(site.name)"
                return .rssFeedLink(path.absoluteString, title: title)
            }),
            .unwrap(location.imagePath ?? site.imagePath, { path in
                let url = site.url(for: path)
                return .socialImageLink(url)
            })
             */
        )
    }
}
