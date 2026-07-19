import Foundation
import Vision
import AppKit

func performOCR(imagePath: String) -> String {
    guard let image = NSImage(contentsOfFile: imagePath),
          let tiffData = image.tiffRepresentation,
          let cgImageSource = CGImageSourceCreateWithData(tiffData as CFData, nil),
          let cgImage = CGImageSourceCreateImageAtIndex(cgImageSource, 0, nil) else {
        return ""
    }
    
    var resultText = ""
    let requestHandler = VNImageRequestHandler(cgImage: cgImage, options: [:])
    let request = VNRecognizeTextRequest { (request, error) in
        guard let observations = request.results as? [VNRecognizedTextObservation] else { return }
        for observation in observations {
            guard let topCandidate = observation.topCandidates(1).first else { continue }
            resultText += topCandidate.string + " "
        }
    }
    request.recognitionLevel = .accurate
    do {
        try requestHandler.perform([request])
    } catch {
        // Silent fail
    }
    return resultText
}

let reviewImagesDir = "/Users/pankajsingh/Desktop/lepxl ecom/public/review_images"
let fileManager = FileManager.default
do {
    let files = try fileManager.contentsOfDirectory(atPath: reviewImagesDir)
    let reviewers = ["Malay", "James", "Monica", "Deepak", "Sneha"]
    
    for file in files {
        if file.hasSuffix(".png") {
            let fullPath = "\(reviewImagesDir)/\(file)"
            let text = performOCR(imagePath: fullPath)
            for reviewer in reviewers {
                if text.localizedCaseInsensitiveContains(reviewer) {
                    print("Match: \(reviewer) -> \(file)")
                }
            }
        }
    }
} catch {
    print("Error reading directory: \(error)")
}
