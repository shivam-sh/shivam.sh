// swift-tools-version:5.2

import PackageDescription

let package = Package(
    name: "Shivam Sh",
    products: [
        .executable(
            name: "Shivam Sh",
            targets: ["ShivamSh"]
        )
    ],
    dependencies: [
        .package(name: "Publish", url: "https://github.com/johnsundell/publish.git", from: "0.6.0")
    ],
    targets: [
        .target(
            name: "ShivamSh",
            dependencies: ["Publish"]
        )
    ]
)
