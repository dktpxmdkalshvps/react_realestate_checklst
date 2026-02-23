from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("http://localhost:5173")

        # Verify title
        title = page.title()
        print(f"Page title is: {title}")

        expected_title = "🏠 부동산 매수 도우미"
        if title == expected_title:
            print("Title verification PASSED")
        else:
            print(f"Title verification FAILED. Expected '{expected_title}', got '{title}'")

        page.screenshot(path="verification/screenshot.png")
        browser.close()

if __name__ == "__main__":
    run()
