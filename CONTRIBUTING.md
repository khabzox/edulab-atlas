# Contributing to EduLab Atlas

First off, thank you for considering contributing to EduLab Atlas! It's people like you that make EduLab Atlas such a great tool for Moroccan students.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* Use a clear and descriptive title
* Describe the exact steps which reproduce the problem
* Provide specific examples to demonstrate the steps
* Describe the behavior you observed after following the steps
* Explain which behavior you expected to see instead and why
* Include screenshots if possible

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* Use a clear and descriptive title
* Provide a step-by-step description of the suggested enhancement
* Provide specific examples to demonstrate the steps
* Describe the current behavior and explain which behavior you expected to see instead
* Explain why this enhancement would be useful

### Pull Requests

* Fill in the required template
* Do not include issue numbers in the PR title
* Include screenshots and animated GIFs in your pull request whenever possible
* Follow our coding conventions
* Document new code
* End all files with a newline

## Development Process

1. Fork the repo
2. Create a new branch from `main`
3. Make your changes
4. Run tests and linting
5. Push to your fork
6. Submit a pull request

### Setup Development Environment

```bash
# Clone your fork
git clone git@github.com:/edulab-atlas.git

# Add upstream remote
git remote add upstream https://github.com/original/edulab-atlas.git

# Install dependencies
npm install

# Create a branch
git checkout -b feature/your-feature-name
```

### Coding Standards

* Use TypeScript
* Follow the existing code style
* Write meaningful commit messages
* Add tests for new features
* Update documentation as needed

### Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line

### Testing

```bash
# Run all tests
npm run test

# Run specific tests
npm run test:watch

# Check types
npm run typecheck

# Run linting
npm run lint
```

## Project Structure

Please maintain the existing project structure:

```bash
edulab-atlas/
├── apps/          # Applications
├── packages/      # Shared packages
└── tooling/       # Development tools
```

## Documentation

* Update the README.md if needed
* Add JSDoc comments for new functions
* Update API documentation
* Add inline comments for complex logic

## Questions?

Feel free to open an issue with the tag `question`.

Thank you for contributing! 🙏 