from transformers import BertTokenizer, BertForSequenceClassification
import pandas as pd
import torch
from sklearn.metrics import accuracy_score

def evaluate(model_path, test_data_path):
    """
    Evaluates the trained model on a test dataset.
    
    Args:
        model_path (str): Path to the saved model directory.
        test_data_path (str): Path to the test dataset.
    """
    # Load the tokenizer and model
    tokenizer = BertTokenizer.from_pretrained(model_path)
    model = BertForSequenceClassification.from_pretrained(model_path)
    model.eval()

    # Load the test data
    data = pd.read_csv(test_data_path)
    correct_answers = data['processed_correct_answer'].tolist()
    student_answers = data['processed_student_answer'].tolist()
    labels = data['label'].tolist()

    predictions = []
    for correct, student in zip(correct_answers, student_answers):
        # Tokenize the inputs
        inputs = tokenizer(
            correct, student,
            max_length=128, padding="max_length", truncation=True, return_tensors="pt"
        )
        with torch.no_grad():
            # Get model outputs
            outputs = model(**inputs)
            logits = outputs.logits
            prediction = torch.argmax(logits, axis=1).item()
            predictions.append(prediction)

    # Calculate accuracy
    accuracy = accuracy_score(labels, predictions)
    print(f"Evaluation Accuracy: {accuracy * 100:.2f}%")

if __name__ == "__main__":
    # Update the paths if necessary
    model_path = './models/'  # Path to the saved model and tokenizer
    test_data_path = './data/datasets/test.csv'  # Path to the test dataset

    evaluate(model_path, test_data_path)
