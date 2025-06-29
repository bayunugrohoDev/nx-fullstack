// src/controllers/vocabEntries.ts
import { Request, Response } from 'express';
import { db } from '../db';
import { vocabEntries, languages } from '../db/schema';
import { eq, and } from 'drizzle-orm';
import { CreateVocabEntryInput, UpdateVocabEntryInput } from '../validation/vocabEntryValidation';
import { sendApiResponse, handleServerError } from '../utils/apiResponse';

// --- Create Vocab Entry ---
export const createVocabEntry = async (req: Request, res: Response) => {
  try {
    const vocabData: CreateVocabEntryInput = req.cleanBody;
    const { original_word, meaning, description, example_sentence, language_id } = vocabData;
    const createdByUserId = req.userId;

    if (!createdByUserId) {
       sendApiResponse(res, 401, false, 'Unauthorized: User ID missing.');
       return
    }

    const languageExists = await db.query.languages.findFirst({
      where: eq(languages.id, language_id),
    });
    if (!languageExists) {
       sendApiResponse(res, 400, false, 'Invalid language_id provided.');
       return
    }

    const existingVocabEntry = await db.query.vocabEntries.findFirst({
      where: and(
        eq(vocabEntries.originalWord, original_word),
        eq(vocabEntries.languageId, language_id)
      ),
    });

    if (existingVocabEntry) {
       sendApiResponse(res, 409, false, 'A vocabulary entry with this word and language already exists.');
       return
    }

    const newEntry = await db.insert(vocabEntries).values({
      originalWord: original_word,
      meaning: meaning,
      description: description,
      exampleSentence: example_sentence,
      languageId: language_id,
      createdByUserId: createdByUserId,
    }).returning();

     sendApiResponse(res, 201, true, 'Vocabulary entry created successfully!', newEntry[0]);
     return
  } catch (error) {
     handleServerError(res, error, 'Error creating vocabulary entry');
     return
  }
};

// --- Get All Vocab Entries ---
export const getVocabEntries = async (req: Request, res: Response) => {
  try {
    const { language_id, user_id } = req.query;

    let query = db.query.vocabEntries.findMany({
      with: {
        language: true,
        createdBy: true,
      },
    });

    if (language_id) {
      query = db.query.vocabEntries.findMany({
        where: eq(vocabEntries.languageId, language_id as string),
        with: { language: true, createdBy: true },
      });
    }
    if (user_id) {
      query = db.query.vocabEntries.findMany({
        where: eq(vocabEntries.createdByUserId, user_id as string),
        with: { language: true, createdBy: true },
      });
    }

    const allEntries = await query;
     sendApiResponse(res, 200, true, 'Fetched vocabulary entries successfully!', allEntries);
     return
  } catch (error) {
     handleServerError(res, error, 'Error fetching vocabulary entries');
     return
  }
};

// --- Get Vocab Entry by ID ---
export const getVocabEntryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const entry = await db.query.vocabEntries.findFirst({
      where: eq(vocabEntries.id, id),
      with: {
        language: true,
        createdBy: true,
      },
    });

    if (!entry) {
       sendApiResponse(res, 404, false, 'Vocabulary entry not found.');
       return
    }

     sendApiResponse(res, 200, true, 'Fetched vocabulary entry successfully!', entry);
     return
  } catch (error) {
     handleServerError(res, error, 'Error fetching vocabulary entry by ID');
     return
  }
};

// --- Update Vocab Entry ---
export const updateVocabEntry = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const createdByUserId = req.userId;
    const userRole = req.role;

    if (!createdByUserId) {
       sendApiResponse(res, 401, false, 'Unauthorized: User ID missing.');
       return
    }

    const updateData: UpdateVocabEntryInput = req.cleanBody;

    const existingEntry = await db.query.vocabEntries.findFirst({
      where: eq(vocabEntries.id, id),
    });

    if (!existingEntry) {
       sendApiResponse(res, 404, false, 'Vocabulary entry not found.');
       return
    }

    if (existingEntry.createdByUserId !== createdByUserId && userRole !== 'admin') {
       sendApiResponse(res, 403, false, 'Forbidden: You do not have permission to update this entry.');
       return
    }

    const updatedFields: { [key: string]: any } = { updatedAt: new Date() };

    if (updateData.original_word !== undefined) updatedFields.originalWord = updateData.original_word;
    if (updateData.meaning !== undefined) updatedFields.meaning = updateData.meaning;
    if (updateData.description !== undefined) updatedFields.description = updateData.description;
    if (updateData.example_sentence !== undefined) updatedFields.exampleSentence = updateData.example_sentence;
    if (updateData.language_id !== undefined) {
      const languageExists = await db.query.languages.findFirst({
        where: eq(languages.id, updateData.language_id),
      });
      if (!languageExists) {
         sendApiResponse(res, 400, false, 'Invalid language_id provided for update.');
         return
      }
      updatedFields.languageId = updateData.language_id;
    }

    const updatedEntries = await db.update(vocabEntries)
      .set(updatedFields)
      .where(eq(vocabEntries.id, id))
      .returning();

    if (updatedEntries.length === 0) {
       sendApiResponse(res, 404, false, 'Vocabulary entry not found or no changes applied.');
       return
    }

     sendApiResponse(res, 200, true, 'Vocabulary entry updated successfully!', updatedEntries[0]);
     return

  } catch (error) {
     handleServerError(res, error, 'Error updating vocabulary entry');
     return
  }
};

// --- Delete Vocab Entry ---
export const deleteVocabEntry = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const createdByUserId = req.userId;
    const userRole = req.role;

    if (!createdByUserId) {
       sendApiResponse(res, 401, false, 'Unauthorized: User ID missing.');
       return
    }

    const existingEntry = await db.query.vocabEntries.findFirst({
      where: eq(vocabEntries.id, id),
    });

    if (!existingEntry) {
       sendApiResponse(res, 404, false, 'Vocabulary entry not found.');
       return
    }

    if (existingEntry.createdByUserId !== createdByUserId && userRole !== 'admin') {
       sendApiResponse(res, 403, false, 'Forbidden: You do not have permission to delete this entry.');
       return
    }

    const deletedEntries = await db.delete(vocabEntries)
      .where(eq(vocabEntries.id, id))
      .returning();

    if (deletedEntries.length === 0) {
       sendApiResponse(res, 404, false, 'Vocabulary entry not found or could not be deleted.');
       return
    }

     sendApiResponse(res, 204, true, 'Vocabulary entry deleted successfully!');
     return
  } catch (error) {
     handleServerError(res, error, 'Error deleting vocabulary entry');
     return
  }
};

