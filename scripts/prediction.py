from transformers import BertTokenizer, BertForSequenceClassification
import torch
import torch.nn.functional as F

def predict(model_path, correct_answer, student_answer):
    """
    Predicts the similarity level and correctness of a student's answer.
    
    Args:
        model_path (str): Path to the saved model directory.
        correct_answer (str): The correct answer for the question.
        student_answer (str): The student's answer to evaluate.
    
    Returns:
        str: "Correct" or "Incorrect" based on the similarity score threshold.
        float: The similarity score.
    """
    tokenizer = BertTokenizer.from_pretrained(model_path)
    model = BertForSequenceClassification.from_pretrained(model_path)
    model.eval()

    # Tokenize input
    inputs = tokenizer(
        correct_answer, student_answer,
        max_length=128, padding="max_length", truncation=True, return_tensors="pt"
    )
    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits
        probabilities = F.softmax(logits, dim=1)
        similarity_score = probabilities[0][1].item()  # Probability for 'Correct'

    print(f"Logits: {logits}")
    print(f"Probabilities: {probabilities}")
    print(f"Similarity Score: {similarity_score:.4f}")

    # Threshold for correctness
    threshold = 0.8
    prediction = "Correct" if similarity_score > threshold else "Incorrect"
    return prediction, similarity_score

if __name__ == "__main__":
    # Example test case

    # correct_answer = "The Mona Lisa was painted by Leonardo da Vinci."
    # student_answer = "Vincent van Gogh painted the Mona Lisa."

    # correct_answer = "im sachintha hasaranga"
    # student_answer = "my name is sachintha"

    correct_answer = "Electricity was discovered by Benjamin Franklin."
    student_answer = "Benjamin Franklin discovered electricity"
    
    result, score = predict('./models/', correct_answer, student_answer)
    print(f"Prediction: {result}, Similarity Score: {score:.4f}")
