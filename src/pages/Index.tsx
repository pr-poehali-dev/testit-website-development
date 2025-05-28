import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import LoginModal from "@/components/LoginModal";
import RegisterModal from "@/components/RegisterModal";

interface Test {
  id: number;
  title: string;
  description: string;
  difficulty: "Начинающий" | "Средний" | "Продвинутый" | "Эксперт";
  category: string;
  questionsCount: number;
  duration: number;
}

const tests: Test[] = [
  {
    id: 1,
    title: "JavaScript Основы",
    description: "Базовые концепции JavaScript: переменные, функции, объекты",
    difficulty: "Начинающий",
    category: "Frontend",
    questionsCount: 15,
    duration: 20,
    rating: 4.5,
  },
  {
    id: 2,
    title: "React Hooks",
    description:
      "Глубокое понимание useState, useEffect и пользовательских хуков",
    difficulty: "Средний",
    category: "Frontend",
    questionsCount: 12,
    duration: 25,
    rating: 4.7,
  },
  {
    id: 3,
    title: "Node.js & Express",
    description: "Серверная разработка с Node.js, создание API",
    difficulty: "Средний",
    category: "Backend",
    questionsCount: 18,
    duration: 35,
    rating: 4.3,
  },
  {
    id: 4,
    title: "Алгоритмы и структуры данных",
    description:
      "Сложность алгоритмов, деревья, графы, динамическое программирование",
    difficulty: "Продвинутый",
    category: "Алгоритмы",
    questionsCount: 20,
    duration: 45,
    rating: 4.8,
  },
  {
    id: 5,
    title: "Docker & Kubernetes",
    description: "Контейнеризация и оркестрация приложений",
    difficulty: "Продвинутый",
    category: "DevOps",
    questionsCount: 14,
    duration: 30,
    rating: 4.4,
  },
  {
    id: 6,
    title: "TypeScript Продвинутый",
    description: "Дженерики, условные типы, декораторы и метапрограммирование",
    difficulty: "Эксперт",
    category: "Frontend",
    questionsCount: 16,
    duration: 40,
    rating: 4.9,
  },
  {
    id: 7,
    title: "SQL и Базы данных",
    description: "Сложные запросы, оптимизация, индексы, транзакции",
    difficulty: "Средний",
    category: "Backend",
    questionsCount: 22,
    duration: 35,
    rating: 4.2,
  },
  {
    id: 8,
    title: "System Design",
    description: "Проектирование масштабируемых систем, микросервисы",
    difficulty: "Эксперт",
    category: "Архитектура",
    questionsCount: 10,
    duration: 60,
    rating: 4.6,
  },
  {
    id: 9,
    title: "Python для Data Science",
    description: "Pandas, NumPy, машинное обучение с scikit-learn",
    difficulty: "Средний",
    category: "Data Science",
    questionsCount: 18,
    duration: 40,
    rating: 4.4,
  },
  {
    id: 10,
    title: "Cybersecurity Basics",
    description: "Основы информационной безопасности, OWASP Top 10",
    difficulty: "Начинающий",
    category: "Security",
    questionsCount: 13,
    duration: 25,
    rating: 4.1,
  },
  {
    id: 11,
    title: "AWS Cloud Practitioner",
    description: "Основы облачных вычислений с Amazon Web Services",
    difficulty: "Начинающий",
    category: "Cloud",
    questionsCount: 25,
    duration: 50,
    rating: 4.3,
  },
  {
    id: 12,
    title: "Machine Learning Advanced",
    description: "Глубокие нейронные сети, TensorFlow, PyTorch",
    difficulty: "Эксперт",
    category: "AI/ML",
    questionsCount: 15,
    duration: 55,
    rating: 4.7,
  },
];

const difficultyColors = {
  Начинающий: "bg-green-100 text-green-800",
  Средний: "bg-yellow-100 text-yellow-800",
  Продвинутый: "bg-orange-100 text-orange-800",
  Эксперт: "bg-red-100 text-red-800",
};

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Все");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("Все");

  const categories = [
    "Все",
    ...Array.from(new Set(tests.map((test) => test.category))),
  ];
  const difficulties = [
    "Все",
    "Начинающий",
    "Средний",
    "Продвинутый",
    "Эксперт",
  ];

  const filteredTests = tests.filter((test) => {
    const categoryMatch =
      selectedCategory === "Все" || test.category === selectedCategory;
    const difficultyMatch =
      selectedDifficulty === "Все" || test.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Icon name="Code" size={28} className="text-primary" />
              <h1 className="text-2xl font-bold text-gray-900">ТестИТ</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost">
                <Icon name="User" size={18} />
                Войти
              </Button>
              <Button>
                <Icon name="UserPlus" size={18} />
                Регистрация
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Проверьте свои IT навыки</h1>
          <p className="text-xl mb-8 text-purple-100">
            Более 12 профессиональных тестов для разработчиков всех уровней
          </p>
          <div className="flex justify-center space-x-8 text-sm">
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={20} />
              <span>10,000+ разработчиков</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Award" size={20} />
              <span>Сертификаты по результатам</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={20} />
              <span>Мгновенные результаты</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={20} className="text-gray-600" />
            <span className="font-medium text-gray-700">Фильтры:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-600">Категория:</span>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="text-xs"
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-600">Сложность:</span>
            {difficulties.map((difficulty) => (
              <Button
                key={difficulty}
                variant={
                  selectedDifficulty === difficulty ? "default" : "outline"
                }
                size="sm"
                onClick={() => setSelectedDifficulty(difficulty)}
                className="text-xs"
              >
                {difficulty}
              </Button>
            ))}
          </div>
        </div>

        {/* Tests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTests.map((test) => (
            <Card
              key={test.id}
              className="hover:shadow-lg transition-shadow duration-200 hover-scale"
            >
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge
                    className={`text-xs ${difficultyColors[test.difficulty]}`}
                  >
                    {test.difficulty}
                  </Badge>
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <Icon
                      name="Star"
                      size={14}
                      className="text-yellow-500 fill-current"
                    />
                    <span>{test.rating}</span>
                  </div>
                </div>
                <CardTitle className="text-lg">{test.title}</CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  {test.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Icon name="HelpCircle" size={16} />
                    <span>{test.questionsCount} вопросов</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={16} />
                    <span>{test.duration} мин</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <Badge variant="outline" className="text-xs">
                    {test.category}
                  </Badge>
                  <Button size="sm" className="ml-auto">
                    <Icon name="Play" size={16} />
                    Начать тест
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
