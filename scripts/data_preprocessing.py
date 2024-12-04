import pandas as pd
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
import nltk

nltk.download('punkt', quiet=True)
nltk.download('stopwords', quiet=True)

def preprocess_text(text):
    """Tokenizes, lowercases, and removes stopwords."""
    tokens = word_tokenize(str(text).lower())
    return ' '.join([word for word in tokens if word.isalnum() and word not in stopwords.words('english')])

def preprocess_data(input_path, output_path):
    """Preprocesses the dataset."""
    raw_data = pd.read_csv(input_path)
    raw_data['processed_correct_answer'] = raw_data['correct_answer'].apply(preprocess_text)
    raw_data['processed_student_answer'] = raw_data['student_answer'].apply(preprocess_text)
    raw_data.to_csv(output_path, index=False)
    print(f"Preprocessed data saved to {output_path}")

if __name__ == "__main__":
    preprocess_data('./data/raw/answers_dataset.csv', './data/processed/answers_processed.csv')
