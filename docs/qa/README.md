# E2E Testing

End to End Testing are performed to test system functionalities from end to end. It typically involves testing user based testing.

The vast majority of test suites will be composed of both unit and component testing shipped as part of the application development workflow  whereas e2e testing becomes a way of automating those test performed when doing [manual/remote testing](remote-testing.md) and usually performed by testers. Regarding the nature of those E2E test, we split them into several categories briefly explained below.

# Smoke Testing

Most relevant and important, usually the happy paths, end to end tests.

# Security Testing

This category tries to

# Performance Testing


# Regression testing

Regression testing are tests performed to make sure that previously working functionality still works, after changes elsewhere in the system.

# Design/Styling testing

I'd say testing for classNames/styles that haven't had any logic applied to them is going to cause more problems than it solved.

This is because every time you decide to refactor the styling (i.e. improving standards or dropping old browser support) your tests will fail even though the components look and feel hasn't changed. This will cause people to not read the test or think about the change and you'll end up with loads of passing tests that don't actually tell you anything.

If the classname/style has been applied because of some logic (i.e. show/hide) then I think thats worth unit testing.

If it is the look of the component you want to test I'd go for 'regression testing' approach and take screen shots of your component using something like Nightwatch and then using Resemble.js compare them to ensure nothing has changed. This coupled with browserstack/SauceLabs means you'll also be able to test multiple browsers.
