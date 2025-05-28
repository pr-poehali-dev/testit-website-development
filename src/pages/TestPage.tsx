import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import TestQuestion from "@/components/TestQuestion";

interface Answer {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface Question {
  id: string;
  text: string;
  answers: Answer[];
}

interface TestData {
  id: number;
  title: string;
  description: string;
  questions: Question[];
  duration: number;
}

const mockTestData: TestData = {
  id: 1,
  title: "JavaScript Основы",
  description: "Базовые концепции JavaScript: переменные, функции, объекты",
  duration: 20,
  questions: [
    {
      id: "1",
      text: "Какой из следующих способов объявления переменной является правильным в ES6?",
      answers: [
        { id: "a", text: "var name = 'John';", isCorrect: false },
        { id: "b", text: "let name = 'John';", isCorrect: true },
        { id: "c", text: "variable name = 'John';", isCorrect: false },
        { id: "d", text: "string name = 'John';", isCorrect: false },
      ],
    },
    {
      id: "2",
      text: "Что выведет следующий код: console.log(typeof null)?",
      answers: [
        { id: "a", text: "null", isCorrect: false },
        { id: "b", text: "undefined", isCorrect: false },
        { id: "c", text: "object", isCorrect: true },
        { id: "d", text: "string", isCorrect: false },
      ],
    },
    {
      id: "3",
      text: "Какой метод используется для добавления элемента в конец массива?",
      answers: [
        { id: "a", text: "push()", isCorrect: true },
        { id: "b", text: "add()", isCorrect: false },
        { id: "c", text: "append()", isCorrect: false },
        { id: "d", text: "insert()", isCorrect: false },
      ],
    },
  ],
};

const TestPage: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(mockTestData.duration * 60);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    if (isStarted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleFinishTest();
    }
  }, [timeLeft, isStarted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswerSelect = (answerId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [mockTestData.questions[currentQuestion].id]: answerId,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < mockTestData.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      handleFinishTest();
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleFinishTest = () => {
    const correctAnswers = mockTestData.questions.filter((question) => {
      const userAnswer = answers[question.id];
      return question.answers.find((answer) => answer.id === userAnswer)
        ?.isCorrect;
    });

    const score = Math.round(
      (correctAnswers.length / mockTestData.questions.length) * 100,
    );

    // Переход на страницу результатов (пока что на главную)
    navigate("/", {
      state: {
        testCompleted: true,
        score,
        testTitle: mockTestData.title,
      },
    });
  };

  if (!isStarted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl mb-2">
              {mockTestData.title}
            </CardTitle>
            <p className="text-gray-600">{mockTestData.description}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4 bg-blue-50 rounded-lg">
                <Icon
                  name="Clock"
                  size={24}
                  className="mx-auto mb-2 text-blue-600"
                />
                <p className="font-semibold">{mockTestData.duration} минут</p>
                <p className="text-sm text-gray-600">Время на тест</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <Icon
                  name="HelpCircle"
                  size={24}
                  className="mx-auto mb-2 text-green-600"
                />
                <p className="font-semibold">
                  {mockTestData.questions.length} вопросов
                </p>
                <p className="text-sm text-gray-600">Всего заданий</p>
              </div>
            </div>

            <div className="text-center">
              <Button
                onClick={() => setIsStarted(true)}
                size="lg"
                className="w-full"
              >
                Начать тест
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="flex items-center space-x-2"
          >
            <Icon name="ArrowLeft" size={16} />
            <span>Выйти из теста</span>
          </Button>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-lg font-semibold">
              <Icon name="Clock" size={20} />
              <span
                className={timeLeft < 300 ? "text-red-600" : "text-gray-700"}
              >
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
        </div>

        <TestQuestion
          question={mockTestData.questions[currentQuestion]}
          questionNumber={currentQuestion + 1}
          totalQuestions={mockTestData.questions.length}
          selectedAnswer={
            answers[mockTestData.questions[currentQuestion].id] || null
          }
          onAnswerSelect={handleAnswerSelect}
          onNext={handleNext}
          onPrev={handlePrev}
          isFirst={currentQuestion === 0}
          isLast={currentQuestion === mockTestData.questions.length - 1}
        />
      </div>
    </div>
  );
};

export default TestPage;
