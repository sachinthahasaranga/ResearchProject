from transformers import BertTokenizer, BertForSequenceClassification, Trainer, TrainingArguments
from torch.utils.data import Dataset
import pandas as pd
import torch

class AnswerSimilarityDataset(Dataset):
    def __init__(self, correct_answers, student_answers, labels):
        self.correct_answers = correct_answers
        self.student_answers = student_answers
        self.labels = labels
        self.tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')

    def __len__(self):
        return len(self.correct_answers)

    def __getitem__(self, idx):
        inputs = self.tokenizer(
            self.correct_answers[idx], self.student_answers[idx],
            max_length=128, padding="max_length", truncation=True, return_tensors="pt"
        )
        return {
            'input_ids': inputs['input_ids'].squeeze(0),
            'attention_mask': inputs['attention_mask'].squeeze(0),
            'labels': torch.tensor(self.labels[idx], dtype=torch.long)
        }

def train_model(train_path, val_path):
    train_data = pd.read_csv(train_path)
    val_data = pd.read_csv(val_path)

    train_dataset = AnswerSimilarityDataset(
        train_data['processed_correct_answer'].tolist(),
        train_data['processed_student_answer'].tolist(),
        train_data['label'].tolist()
    )
    val_dataset = AnswerSimilarityDataset(
        val_data['processed_correct_answer'].tolist(),
        val_data['processed_student_answer'].tolist(),
        val_data['label'].tolist()
    )

    # Load pre-trained BERT model and tokenizer
    model = BertForSequenceClassification.from_pretrained('bert-base-uncased', num_labels=2)
    tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')

    # training_args = TrainingArguments(
    #     output_dir='./models/',
    #     num_train_epochs=3,
    #     per_device_train_batch_size=8,
    #     evaluation_strategy="epoch",
    #     save_strategy="epoch",
    #     load_best_model_at_end=True,
    #     logging_dir='./logs/',
    # )

    training_args = TrainingArguments(
        output_dir='./models/',
        num_train_epochs=6,  
        per_device_train_batch_size=16,  
        learning_rate=5e-5, 
        evaluation_strategy="epoch",
        save_strategy="epoch",
        load_best_model_at_end=True,
        logging_dir='./logs/',
    )

    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=train_dataset,
        eval_dataset=val_dataset
    )

    # Train the model
    trainer.train()

    # Save the model and tokenizer
    model.save_pretrained('./models/')
    tokenizer.save_pretrained('./models/')
    print("Model and tokenizer saved to './models/'")

if __name__ == "__main__":
    train_model('./data/datasets/train.csv', './data/datasets/validation.csv')
