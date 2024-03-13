function Challenge() {
    const programmingLanguages = {
        "Python": "print('Hello, World!')",
        "JavaScript": "console.log('Hello, World!');",
        "Java": "public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println('Hello, World!');\n    }\n}",
        "C++": "#include <iostream>\n\nint main() {\n    std::cout << 'Hello, World!' << std::endl;\n    return 0;\n}",
        "Ruby": "puts 'Hello, World!'",
        "Swift": "print('Hello, World!')",
        "C#": "using System;\n\nclass Program\n{\n    static void Main()\n    {\n        Console.WriteLine('Hello, World!');\n    }\n}",
        "Go": "package main\n\nimport 'fmt'\n\nfunc main() {\n    fmt.Println('Hello, World!')\n}",
        "PHP": "<?php\n\necho 'Hello, World!';\n?>",
        "Rust": "fn main() {\n    println!('Hello, World!');\n}",
    };

    const languages = Object.keys(programmingLanguages);
    const randomLanguage = languages[Math.floor(Math.random() * languages.length)];
    const helloWorldCode = programmingLanguages[randomLanguage];

    const dayChallenge = {
        helloWorld: helloWorldCode,
        language: randomLanguage.toLowerCase(),
        languages: languages,
    };

    return dayChallenge;
}

var exports = module.exports = {Challenge}