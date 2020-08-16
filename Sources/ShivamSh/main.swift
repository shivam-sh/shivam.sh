import Foundation
import Publish
import Plot

// This type acts as the configuration for your website.
struct ShivamSh: Website {
    enum SectionID: String, WebsiteSectionID {
        // Add the sections that you want your website to contain here:
        case posts
    }

    struct ItemMetadata: WebsiteItemMetadata {
        // Add any site-specific metadata that you want to use here.
    }

    // Update these properties to configure your website:
    var url = URL(string: "https://shivamsh.me")!
    var name = "Shivam Sh"
    var description = "A description of ShivamSh"
    var language: Language { .english }
    var imagePath: Path? { nil }
    var favicon = Favicon(path: "/images/favicon.png")
}

// This will generate your website using the built-in Foundation theme:
try ShivamSh().publish(withTheme: .term)
