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

func dateToString(date: Date) -> String {
    let formatter = DateFormatter()
    
    formatter.dateStyle = .short
    return formatter.string(from: date)
}
