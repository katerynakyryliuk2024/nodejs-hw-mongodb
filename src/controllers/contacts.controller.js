import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
} from '../services/contacts.js';

import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import * as fs from 'node:fs/promises';
import path from 'node:path';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    userId: req.user.id,
  });
  console.log(contacts);

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  await fs.rename(
    req.file.path,
    path.resolve('src', 'uploads', 'photos', req.file.filename),
  );

  const contact = await createContact({
    ...req.body,
    userId: req.user.id,
    photo: req.file.filename,
  });
  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
  });
};

export const patchContactController = async (req, res) => {
  await fs.rename(
    req.file.path,
    path.resolve('src', 'uploads', 'photos', req.file.filename),
  );
  const { contactId } = req.params;
  const { photo } = req.file.filename;
  const result = await updateContact(contactId, req.body, req.user.id, photo);

  if (result === null) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result,
  });
};

export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;

  const result = await deleteContact(contactId, req.user.id);

  if (result === null) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(204).json({
    status: 204,
    message: 'Successfully deleted a contact!',
  });
};
