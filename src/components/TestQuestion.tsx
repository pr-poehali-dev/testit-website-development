import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

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

interface TestQuestionProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: string | null;
  onAnswerSelect: (answerId: string) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const TestQuestion: React.FC<TestQuestionProps> = ({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onAnswerSelect,
  onNext,
  onPrev,
  isFirst,
  isLast,
}) => {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center mb-4">
          <Badge variant="outline">
            Вопрос {questionNumber} из {totalQuestions}
          </Badge>
          <div className="w-full max-w-xs bg-gray-200 rounded-full h-2 ml-4">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            />
          </div>
        </div>
        <CardTitle className="text-xl">{question.text}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 mb-6">
          {question.answers.map((answer) => (
            <button
              key={answer.id}
              onClick={() => onAnswerSelect(answer.id)}
              className={`w-full p-4 text-left border rounded-lg transition-all ${
                selectedAnswer === answer.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-4 h-4 rounded-full border-2 ${
                    selectedAnswer === answer.id
                      ? "border-blue-500 bg-blue-500"
                      : "border-gray-300"
                  }`}
                >
                  {selectedAnswer === answer.id && (
                    <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                  )}
                </div>
                <span>{answer.text}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={onPrev}
            disabled={isFirst}
            className="flex items-center space-x-2"
          >
            <Icon name="ChevronLeft" size={16} />
            <span>Назад</span>
          </Button>

          <Button
            onClick={onNext}
            disabled={!selectedAnswer}
            className="flex items-center space-x-2"
          >
            <span>{isLast ? "Завершить тест" : "Далее"}</span>
            {!isLast && <Icon name="ChevronRight" size={16} />}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestQuestion;
