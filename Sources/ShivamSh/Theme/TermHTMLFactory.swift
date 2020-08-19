import Publish
import Plot

public struct TermHTMLFactory<Site: Website>: HTMLFactory {
    
    // Make Homepage
    public func makeIndexHTML(for index: Index, context: PublishingContext<Site>) throws -> HTML {
        HTML(
            .lang(context.site.language),
            .head(for: index, on: context.site),
            
            .body(
                .header(for: context),
                .banner(
                    .h1("Hi, my name is Shivam"),
                    .div(
                        .p("I'm a student at the University of Waterloo exploring development and studying engineering"),
                        .a(.class("button"),
                           .p("Learn More &nbsp;&nbsp;&nbsp;&nbsp;",
                              .i(.class("fas fa-chevron-right"))
                           ),
                           .href("/about")
                        )
                    )
                ),
                .shadow(),
                .footer(for: context.site)
            )
        )
    }

    // Make page that represents a group of pages
    public func makeSectionHTML(for section: Section<Site>, context: PublishingContext<Site>) throws -> HTML {
        print(section.path)
        return HTML(
            .lang(context.site.language),
            .head(for: section, on: context.site),
            
            .body(
                .header(for: context),
                .content(
                    .contentBody(section.content.body)
                    ),
                .postList(for: section.items, on: context.site),
                .footer(for: context.site)
            )
        )
    }

    // Generate a page for an individual piece of content
    public func makeItemHTML(for item: Item<Site>, context: PublishingContext<Site>) throws -> HTML {
        HTML(
            .lang(context.site.language),
            .head(for: item, on: context.site),

            .body(
                .header(for: context),
                .content(
                    .contentBody(item.body)
                ),
                .footer(for: context.site)
            )
        )
    }

    // Generate a custom page
    public func makePageHTML(for page: Page, context: PublishingContext<Site>) throws -> HTML {
        HTML(
            .lang(context.site.language),
            .head(for: page, on: context.site),

            .body(
                .header(for: context),
                .footer(for: context.site)
            )
        )
    }

    //
    public func makeTagListHTML(for page: TagListPage, context: PublishingContext<Site>) throws -> HTML? {
        HTML("")
    }
    
    //
    public func makeTagDetailsHTML(for page: TagDetailsPage, context: PublishingContext<Site>) throws -> HTML? {
        HTML("")
    }
}
