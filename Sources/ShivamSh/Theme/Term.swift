//
//  Shivam Sh | shivam-sh.github.io
//
// This file generates the term theme for my website

import Publish
import Foundation
import Plot

public extension Theme {
    static var term: Self {
        Theme(htmlFactory: TermHTMLFactory(),
              resourcePaths: ["Resources/css/styles.css"])
    }
}

private struct TermHTMLFactory<Site: Website>: HTMLFactory {
    
    // Make Homepage
    func makeIndexHTML(for index: Index, context: PublishingContext<Site>) throws -> HTML {
        HTML(
            .lang(context.site.language),
            .head(for: index, on: context.site),
            .head(
                .link(.href("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"))
            ),
            .body(.wrapper(
                .header(for: context),
                /*.content(
                    .h1("H1"),
                    .h2("H2"),
                    .h3("H3"),
                    .h4("H4"),
                    .h5("H5"),
                    .p("Paragraph"),
                    .p(.a(
                        .href("https://google.ca"),
                            .text("Link")
                    ))
                ),*/
                .footer(for: context.site)
            ))
        )
    }

    // Make page that represents a group of pages
    func makeSectionHTML(for section: Section<Site>, context: PublishingContext<Site>) throws -> HTML {
        print(section.path)
        return HTML("")
    }

    // Generate a page for an individual piece of content
    func makeItemHTML(for item: Item<Site>, context: PublishingContext<Site>) throws -> HTML {
        HTML("")
    }

    // Generate a custom page
    func makePageHTML(for page: Page, context: PublishingContext<Site>) throws -> HTML {
        HTML("")
    }

    //
    func makeTagListHTML(for page: TagListPage, context: PublishingContext<Site>) throws -> HTML? {
        HTML("")
    }
    
    //
    func makeTagDetailsHTML(for page: TagDetailsPage, context: PublishingContext<Site>) throws -> HTML? {
        HTML("")
    }
}

// Generate custom nodes to make programming easier through abstractions
private extension Node where Context == HTML.BodyContext {
    
    static func wrapper(_ nodes: Node...) -> Node {
        .div(.class("wrapper"), .group(
            nodes
        ))
    }
    
    static func header<T: Website>(for context: PublishingContext<T>) -> Node {
        return .header(
            .a(
                .href(context.site.url),
                .img(.class("navLogo"),.src("/images/Sh Logo.png"))
            ),
            .nav(
                .a(
                    .text("BLOG"),
                    .href("")
                ),
                .span("   /   "),
                .a(
                    .text("PROJECTS"),
                    .href("")
                ),
                .span("   /   "),
                .a(
                    .text("ABOUT ME"),
                    .href("")
                )
            )
        )
    }
    
    static func content(_ nodes: Node...) -> Node {
        .div(.class("content"), .group(
            nodes
        ))
    }
    
    static func footer<T: Website>(for site: T) -> Node {
        .footer(
            .div(
                
            )
        )
    }
}

func dateToString(date: Date) -> String {
    let formatter = DateFormatter()
    
    formatter.dateStyle = .short
    return formatter.string(from: date)
}
