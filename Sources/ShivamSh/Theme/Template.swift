/*
import Publish
import Foundation
import Plot

public extension Theme {
    static var term: Self {
        Theme(htmlFactory: TermHTMLFactory(),
              resourcePaths: ["Resources/Theme/styles.css"])
    }
}

private struct TermHTMLFactory<Site: Website>: HTMLFactory {
    
    // Make Homepage
    func makeIndexHTML(for index: Index, context: PublishingContext<Site>) throws -> HTML {
        HTML("")
    }

    // Make page that represents a group of pages
    func makeSectionHTML(for section: Section<Site>, context: PublishingContext<Site>) throws -> HTML {
        print(section.path)
        HTML("")
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
        .div(.class("wrapper"), .group(nodes))
    }
    
    static func header<T: Website>(for context: PublishingContext<T>, selectedSection: T.SectionID?) -> Node {
        return .header(
            .div()
        )
    }
    
    static func footer<T: Website>(for site: T) -> Node {
        return .footer(
            )
        )
    }
}

func dateToString(date: Date) -> String {
    let formatter = DateFormatter()
    
    formatter.dateStyle = .short
    return formatter.string(from: date)
}*/
